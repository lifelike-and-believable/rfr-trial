---
id: user-greet-cli
status: approved
derived-from: [design-greet-cli]
---

# Greeting someone from the command line

To greet someone, run `greet` with their name:

```
node src/cli.mjs greet Ada
```

It prints:

```
Hello, Ada.
```

To make the greeting loud, add `--shout`, before or after the name:

```
node src/cli.mjs greet Ada --shout
```

It prints:

```
HELLO, ADA.
```

If you leave out the name, nothing is greeted. The command prints how to use it and reports failure:

```
Usage: node src/cli.mjs greet <name> [--shout]
```
