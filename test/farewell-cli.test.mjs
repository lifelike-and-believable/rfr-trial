import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../src/cli.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });

// farewell-cli#AC-1
test('farewell <name> prints the farewell and exits 0', () => {
  const r = run('farewell', 'Ada');
  assert.equal(r.stdout, 'Goodbye, Ada.\n');
  assert.equal(r.status, 0);
});

// farewell-cli#AC-2
test('farewell with no name prints usage to stderr and exits 1', () => {
  const r = run('farewell');
  assert.equal(r.stdout, '');
  assert.equal(r.stderr, 'Usage: node src/cli.mjs farewell <name>\n');
  assert.equal(r.status, 1);
});

// farewell-cli#AC-3
test('greet is unchanged', () => {
  const ok = run('greet', 'Ada');
  assert.equal(ok.stdout, 'Hello, Ada.\n');
  assert.equal(ok.status, 0);
  const bad = run('greet');
  assert.equal(bad.stderr, 'Usage: node src/cli.mjs greet <name> [--shout]\n');
  assert.equal(bad.status, 1);
});
