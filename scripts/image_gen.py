#!/usr/bin/env python3
from __future__ import annotations

import argparse
import base64
import json
import os
from pathlib import Path
from typing import Any

from openai import OpenAI


ROOT = Path(__file__).resolve().parent.parent


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and value and key not in os.environ:
            os.environ[key] = value


def ensure_api_key() -> None:
    load_env_file(ROOT / ".env.local")
    if not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("OPENAI_API_KEY is missing. Put it in .env.local.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate images with the OpenAI Images API.")
    parser.add_argument("--jobs", help="Path to a JSON file containing an array of image jobs.")
    parser.add_argument("--prompt", help="Single prompt to generate.")
    parser.add_argument("--out", help="Output path for single-image mode.")
    parser.add_argument("--model", default="gpt-image-1.5", help="Image model to use.")
    parser.add_argument("--size", default="1536x1024", help="Output size, e.g. 1536x1024.")
    parser.add_argument("--quality", default="high", help="Image quality.")
    parser.add_argument("--background", default="opaque", help="Image background setting.")
    parser.add_argument("--output-format", default="png", help="Output format: png, webp, jpeg.")
    parser.add_argument("--input-fidelity", default="high", help="Input fidelity for edit/reference jobs.")
    return parser.parse_args()


def write_image(output_path: Path, b64_data: str) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(base64.b64decode(b64_data))


def generate_one(
    client: OpenAI,
    *,
    model: str,
    prompt: str,
    size: str,
    quality: str,
    background: str,
    output_format: str,
    input_fidelity: str,
    out: Path,
    refs: list[Path] | None = None,
) -> dict[str, Any]:
    if refs:
        files = [ref.open("rb") for ref in refs]
        try:
            result = client.images.edit(
                model=model,
                image=files,
                prompt=prompt,
                size=size,
                quality=quality,
                background=background,
                output_format=output_format,
                input_fidelity=input_fidelity,
            )
        finally:
            for file in files:
                file.close()
    else:
        result = client.images.generate(
            model=model,
            prompt=prompt,
            size=size,
            quality=quality,
            background=background,
            output_format=output_format,
        )
    image = result.data[0]
    if not getattr(image, "b64_json", None):
        raise RuntimeError("Images API response did not include b64_json data.")
    write_image(out, image.b64_json)
    return {
        "path": str(out),
        "size": size,
        "quality": quality,
        "model": model,
        "output_format": output_format,
        "reference_count": len(refs or []),
    }


def run_jobs(
    client: OpenAI,
    jobs_path: Path,
    default_model: str,
    default_size: str,
    default_quality: str,
    default_background: str,
    default_output_format: str,
    default_input_fidelity: str,
) -> list[dict[str, Any]]:
    jobs = json.loads(jobs_path.read_text(encoding="utf-8"))
    if not isinstance(jobs, list):
        raise SystemExit("--jobs file must contain a JSON array.")

    results: list[dict[str, Any]] = []
    for job in jobs:
        if not isinstance(job, dict):
            raise SystemExit("Each job must be a JSON object.")
        name = job["name"]
        prompt = job["prompt"]
        out = ROOT / job["out"]
        refs = [ROOT / ref for ref in job.get("refs", [])]
        result = generate_one(
            client,
            model=job.get("model", default_model),
            prompt=prompt,
            size=job.get("size", default_size),
            quality=job.get("quality", default_quality),
            background=job.get("background", default_background),
            output_format=job.get("output_format", default_output_format),
            input_fidelity=job.get("input_fidelity", default_input_fidelity),
            out=out,
            refs=refs,
        )
        result["name"] = name
        results.append(result)
        print(f"generated {name} -> {out}")
    return results


def main() -> None:
    args = parse_args()
    ensure_api_key()
    client = OpenAI()

    if args.jobs:
        results = run_jobs(
            client,
            Path(args.jobs),
            args.model,
            args.size,
            args.quality,
            args.background,
            args.output_format,
            args.input_fidelity,
        )
        print(json.dumps(results, indent=2))
        return

    if not args.prompt or not args.out:
        raise SystemExit("Single-image mode requires --prompt and --out.")

    result = generate_one(
        client,
        model=args.model,
        prompt=args.prompt,
        size=args.size,
        quality=args.quality,
        background=args.background,
        output_format=args.output_format,
        input_fidelity=args.input_fidelity,
        out=ROOT / args.out,
    )
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
