#!/usr/bin/env node
// Stop hook (rewrite plan 25a, trial 4). During a delivery run, send the agent back to work unless
// every feature with approved user documentation has its spec, tests, and tutorial, the tests pass,
// and the work is committed and pushed, or what is missing is recorded in DECISIONS.md. A run is
// under way only on a branch other than main; on main (a session waiting for a packet to merge) the
// agent may stop. It never blocks more than MAX times in a row without a new commit in between, so
// a run that makes no progress still ends, and one that is progressing is never cut off.
// Second version: the first blocked a session that was only waiting, on "commits not pushed", and
// spent all its blocks before the run began (trial of 2026-11-12).
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const MAX = 6;
const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const git = (...args) => spawnSync('git', args, { cwd: root, encoding: 'utf8' });
const read = p => { try { return fs.readFileSync(path.join(root, p), 'utf8'); } catch { return null; } };
const counter = path.join(root, '.git', 'rfr-stop-blocks');
const log = path.join(root, '.git', 'rfr-stop-log');
const note = line => { try { fs.appendFileSync(log, `${new Date().toISOString()} ${line}\n`); } catch { /* no log */ } };

const features = (() => {
  try { return fs.readdirSync(path.join(root, 'docs/user')).filter(f => f.endsWith('.md') && f !== 'README.md').map(f => f.slice(0, -3)); } catch { return []; }
})().filter(f => /^status:\s*approved\s*$/m.test(read(`docs/user/${f}.md`) ?? ''));

const missing = [];
const decisions = read('DECISIONS.md') ?? '';
for (const f of features) {
  const need = [];
  if (!read(`docs/specs/${f}.md`)) need.push(`docs/specs/${f}.md (the spec)`);
  const test = read(`test/${f}.test.mjs`);
  if (!test || !test.includes(`${f}#AC-`)) need.push(`test/${f}.test.mjs with tests citing ${f}#AC-n`);
  if (!read(`docs/tutorials/${f}.md`)) need.push(`docs/tutorials/${f}.md (the tutorial)`);
  for (const item of need) if (!decisions.includes(item.split(' ')[0])) missing.push(item);
}
const branch = git('rev-parse', '--abbrev-ref', 'HEAD').stdout.trim();
if (branch === 'main' || branch === 'HEAD') { note(`allow on ${branch}: no run under way`); process.exit(0); }
if (features.length) {
  const tests = spawnSync(process.execPath, ['--test'], { cwd: root, encoding: 'utf8' });
  if (tests.status !== 0) missing.push('`node --test` fails');
  if (git('status', '--porcelain').stdout.trim()) missing.push('uncommitted changes');
  const head = git('rev-parse', 'HEAD').stdout.trim();
  const upstream = git('rev-parse', '@{u}');
  if (upstream.status !== 0) missing.push(`the branch is not pushed (git push -u origin ${branch})`);
  else if (upstream.stdout.trim() !== head) missing.push('commits not pushed');
}

if (!missing.length) { note(`allow features=${features.join(',') || 'none'}`); try { fs.rmSync(counter); } catch { /* none */ } process.exit(0); }
// Count blocks since the last new commit: "<head sha> <count>".
const headNow = git('rev-parse', 'HEAD').stdout.trim();
const [seenHead, seenCount] = (read('.git/rfr-stop-blocks') ?? '').trim().split(' ');
const blocks = (seenHead === headNow ? Number(seenCount) || 0 : 0) + 1;
if (blocks > MAX) { note(`allow after ${MAX} blocks with no new commit; still missing: ${missing.join('; ')}`); process.exit(0); }
fs.writeFileSync(counter, `${headNow} ${blocks}`);
note(`block ${blocks}: ${missing.join('; ')}`);
process.stdout.write(JSON.stringify({ decision: 'block', reason: `The delivery run is not finished. Still to do: ${missing.join('; ')}. Carry on without asking the lead. If something cannot be done, record it in DECISIONS.md, naming the file, and finish the rest.` }));
