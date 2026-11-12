---
id: tutorial-farewell-cli
status: draft
derived-from: [user-farewell-cli]
---

# Tutorial: say goodbye from the command line

Run each command from the root of the repository. The output shown is what each command printed when it was run for this tutorial.

1. Say goodbye to someone by name.

   ```
   node src/cli.mjs farewell Ada
   ```

   Output (exit code 0):

   ```
   Goodbye, Ada.
   ```

2. Leave out the name.

   ```
   node src/cli.mjs farewell
   ```

   Output, on standard error (exit code 1):

   ```
   Usage: node src/cli.mjs farewell <name>
   ```
