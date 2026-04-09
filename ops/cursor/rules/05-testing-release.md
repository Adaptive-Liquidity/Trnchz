# Rule: Testing and release

- **Program**: Happy path + abuse path + mint-policy rejection tests before merge; **negative tests** mandatory for money-path instructions.
- **Indexer**: Replay/idempotency tests or a **documented manual rebuild** procedure when schema or decoders change.
- **Release**: Pinned toolchain; verifiable/pinned Anchor build where applicable; **IDL** and **deployed program addresses** recorded; rollback notes for **web/indexer** (program logic is not “rolled back” without an upgrade decision).
- **CI**: Headless Cursor CLI or other automation for repeatable review/fix gates where configured.

## Forbidden

- Merging program changes that only add happy-path coverage for critical instructions.
- Shipping release artifacts without checksums/addresses documented for the program binary consumers care about.
