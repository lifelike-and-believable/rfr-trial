---
id: spec-greet-cli
status: draft
derived-from: [user-greet-cli]
---

# Spec: greet from the command line

Each criterion is taken from `docs/user/greet-cli.md`. The command is `node src/cli.mjs`.

- **AC-1**: `greet <name>` prints `Hello, <name>.` followed by a newline to standard output and exits with code 0. For `greet Ada` the output is `Hello, Ada.`.
- **AC-2**: `greet <name> --shout` prints the greeting in capitals and exits with code 0. For `greet Ada --shout` the output is `HELLO, ADA.`.
- **AC-3**: `--shout` may come before the name. `greet --shout Ada` prints `HELLO, ADA.` and exits with code 0.
- **AC-4**: `greet` with no name prints `Usage: node src/cli.mjs greet <name> [--shout]` to standard error, prints nothing to standard output, and exits with code 1. This also holds for `greet --shout` (a flag but no name).
