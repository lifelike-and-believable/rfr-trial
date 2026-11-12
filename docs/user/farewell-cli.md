---
id: user-farewell-cli
status: approved
derived-from: [design-farewell-cli]
---

# Saying goodbye from the command line

To say goodbye to someone, run `farewell` with their name:

```
node src/cli.mjs farewell Ada
```

It prints:

```
Goodbye, Ada.
```

If you leave out the name, the command prints how to use it and reports failure:

```
Usage: node src/cli.mjs farewell <name>
```
