# Sets HOME for Solana cargo-build-sbf (Anchor) on Windows, then runs anchor.
# Usage (repo root): .\scripts\anchor-windows.ps1 build
#                     .\scripts\anchor-windows.ps1 test
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$AnchorArgs
)

if (-not $env:USERPROFILE) {
    Write-Error "USERPROFILE is not set; cannot derive HOME."
    exit 1
}

$env:HOME = $env:USERPROFILE
& anchor @AnchorArgs
exit $LASTEXITCODE
