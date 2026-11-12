# rfr-trial

A throwaway repository for trials of the rules-for-robots rewrite plan. Verify with `node --test`.

## Process

A feature moves through two pull requests. The lead approves each one in GitHub; nothing else is asked of them.

1. **Feature packet** (already written by the time you start): `docs/product/stories/<feature>.md`, `docs/design/<feature>.md`, `docs/user/<feature>.md`, each with `status: approved` once merged.
2. **Delivery**, which you run alone once the packet is on `main`: on one branch, with a commit for each step,
   - `docs/specs/<feature>.md`: acceptance criteria `AC-1`, `AC-2`, ... each taken from the approved user documentation;
   - tests in `test/<feature>.test.mjs`, written before the implementation, each citing its criterion as `<feature>#AC-n` in a comment; run them and see them fail;
   - the implementation in `src/`, until `node --test` passes;
   - `docs/tutorials/<feature>.md`: steps a person follows to try the feature, taken from the user documentation, with the exact commands and the output to expect. Run each command yourself and record what it printed.

The approved user documentation is the definition of done. Where it and the code disagree, the code is wrong.

## Rules for a delivery run

- Never ask the lead anything during the run, and never end your turn to wait for them. Decide, and carry on.
- Something only the lead can decide, or that the approved documents leave open: choose a default, record the question and your default in `DECISIONS.md` on the branch, and continue.
- Push your branch. Do not open, approve, or merge pull requests: a workflow opens the pull request for a pushed branch as the `rfr-agent` App, and GitHub merges it when the checks pass and the lead has approved.
- Do not edit `.claude/`, `.github/`, or this file.
- The run is finished when the spec, tests, implementation, and tutorial are committed and pushed and `node --test` passes. Then report once: the branch, what you built, and anything in `DECISIONS.md`.
