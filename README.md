# rfr-trial

A throwaway repository for the trials in phase 25a of the rules-for-robots [rewrite plan](https://github.com/lifelike-and-believable/rules-for-robots/blob/main/docs/rewrite-plan.md). Nothing here is a product.

Trial 1: an agent pushes a branch; a workflow opens the pull request as the `rfr-agent` GitHub App and turns on auto-merge. A pull request that touches a gated folder waits for a code owner's review; any other merges itself when the checks pass.
