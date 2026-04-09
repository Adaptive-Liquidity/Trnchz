# Instruction review checklist

- Accounts: every account has constraint or explicit check
- Signers: only intended signers required
- Mint/token program: validated against policy
- Amounts: exact battle lot / exact stake enforced
- Reentrancy-style: no inconsistent state on early abort
- Events: emitted for indexer consumption
