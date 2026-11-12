---
id: design-farewell-cli
status: approved
derived-from: [story-farewell-cli]
---

# Design: say goodbye from the command line

A second subcommand, `farewell`, on the existing command `node src/cli.mjs`.

| Input | Result |
|---|---|
| `farewell <name>` | Prints the farewell on one line and exits with code 0 |
| `farewell` with no name | Prints a usage line to standard error and exits with code 1 |

The farewell text is the one the library's `farewell` function returns. The usage line is `Usage: node src/cli.mjs farewell <name>`. The `greet` subcommand is unchanged.
