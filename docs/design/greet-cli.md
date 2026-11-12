---
id: design-greet-cli
status: approved
derived-from: [story-greet-cli]
---

# Design: greet from the command line

One command, `node src/cli.mjs`, with one subcommand, `greet`.

| Input | Result |
|---|---|
| `greet <name>` | Prints the greeting on one line and exits with code 0 |
| `greet <name> --shout` | Prints the same greeting in capitals and exits with code 0 |
| `greet` with no name, or any other subcommand | Prints a usage line to standard error and exits with code 1 |

The greeting text is the one the library's `greet` function returns. The usage line is `Usage: node src/cli.mjs greet <name> [--shout]`. The flag may come before or after the name.
