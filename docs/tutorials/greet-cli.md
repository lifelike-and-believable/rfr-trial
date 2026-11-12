---
id: tutorial-greet-cli
status: draft
derived-from: [user-greet-cli]
---

# Tutorial: greet someone from the command line

Run each command from the root of the repository. The output shown is what each command printed when it was run for this tutorial.

1. Greet someone by name.

   ```
   node src/cli.mjs greet Ada
   ```

   Output (exit code 0):

   ```
   Hello, Ada.
   ```

2. Make the greeting loud with `--shout`.

   ```
   node src/cli.mjs greet Ada --shout
   ```

   Output (exit code 0):

   ```
   HELLO, ADA.
   ```

3. The flag also works before the name.

   ```
   node src/cli.mjs greet --shout Ada
   ```

   Output (exit code 0):

   ```
   HELLO, ADA.
   ```

4. Leave out the name.

   ```
   node src/cli.mjs greet
   ```

   Output, on standard error (exit code 1):

   ```
   Usage: node src/cli.mjs greet <name> [--shout]
   ```
