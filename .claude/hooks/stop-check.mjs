#!/usr/bin/env node
// Stop hook (rewrite plan 25a, trial 4). During a delivery run, send the agent back to work unless
// every feature with approved user documentation has its spec, tests, and tutorial, the tests pass,
// and the work is committed and pushed, or what is missing is recorded in DECISIONS.md. Outside a
// run (no approved user documentation on this branch) it lets the agent stop. It never blocks more
// than MAX times in a row, so a run that cannot finish still ends.
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
if (features.length) {
  const tests = spawnSync(process.execPath, ['--test'], { cwd: root, encoding: 'utf8' });
  if (tests.status !== 0) missing.push('`node --test` fails');
  if (git('status', '--porcelain').stdout.trim()) missing.push('uncommitted changes');
  const head = git('rev-parse', 'HEAD').stdout.trim();
  const upstream = git('rev-parse', '@{u}');
  if (upstream.status !== 0 || upstream.stdout.trim() !== head) missing.push('commits not pushed');
}

if (!missing.length) { note(`allow features=${features.join(',') || 'none'}`); try { fs.rmSync(counter); } catch { /* none */ } process.exit(0); }
const blocks = Number(read('.git/rfr-stop-blocks') ?? 0) + 1;
if (blocks > MAX) { note(`allow after ${MAX} blocks; still missing: ${missing.join('; ')}`); process.exit(0); }
fs.writeFileSync(counter, String(blocks));
note(`block ${blocks}: ${missing.join('; ')}`);
process.stdout.write(JSON.stringify({ decision: 'block', reason: `The delivery run is not finished. Still to do: ${missing.join('; ')}. Carry on without asking the lead. If something cannot be done, record it in DECISIONS.md, naming the file, and finish the rest.` }));
