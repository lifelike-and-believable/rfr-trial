---
id: spec-farewell-cli
status: draft
derived-from: [user-farewell-cli]
---

# Spec: say goodbye from the command line

Each criterion is taken from `docs/user/farewell-cli.md`. The command is `node src/cli.mjs`.

- **AC-1**: `farewell <name>` prints `Goodbye, <name>.` followed by a newline to standard output and exits with code 0. For `farewell Ada` the output is `Goodbye, Ada.`. The text is the one the library's `farewell` function returns.
- **AC-2**: `farewell` with no name prints `Usage: node src/cli.mjs farewell <name>` to standard error, prints nothing to standard output, and exits with code 1.
- **AC-3**: The `greet` subcommand is unchanged: its behaviour in `docs/specs/greet-cli.md` (AC-1 to AC-4) still holds.
