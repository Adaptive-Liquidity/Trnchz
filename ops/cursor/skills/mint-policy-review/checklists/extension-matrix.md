# Extension / authority matrix

| Check | Risk | Default |
|-------|------|--------|
| Mint authority active | Supply inflation | Reject |
| Freeze authority | Account freeze | Reject |
| Permanent delegate | Arbitrary move/burn | Reject |
| Transfer fee | Amount mismatch | Reject |
| Confidential transfer | Hidden amounts | Reject |
| Default account state frozen | New holders frozen | Reject |
| Mint close authority | Lifecycle edge cases | Reject |

Mark overrides only with ADR + mint-policy-auditor sign-off.
