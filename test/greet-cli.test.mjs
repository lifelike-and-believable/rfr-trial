import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../src/cli.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
const usage = 'Usage: node src/cli.mjs greet <name> [--shout]\n';

// greet-cli#AC-1
test('greet <name> prints the greeting and exits 0', () => {
  const r = run('greet', 'Ada');
  assert.equal(r.stdout, 'Hello, Ada.\n');
  assert.equal(r.status, 0);
});

// greet-cli#AC-2
test('greet <name> --shout prints the greeting in capitals', () => {
  const r = run('greet', 'Ada', '--shout');
  assert.equal(r.stdout, 'HELLO, ADA.\n');
  assert.equal(r.status, 0);
});

// greet-cli#AC-3
test('--shout may come before the name', () => {
  const r = run('greet', '--shout', 'Ada');
  assert.equal(r.stdout, 'HELLO, ADA.\n');
  assert.equal(r.status, 0);
});

// greet-cli#AC-4
test('greet with no name prints usage to stderr and exits 1', () => {
  for (const args of [['greet'], ['greet', '--shout']]) {
    const r = run(...args);
    assert.equal(r.stdout, '');
    assert.equal(r.stderr, usage);
    assert.equal(r.status, 1);
  }
});
