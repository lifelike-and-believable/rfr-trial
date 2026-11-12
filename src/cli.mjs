#!/usr/bin/env node
import { greet } from './greet.mjs';

const usage = 'Usage: node src/cli.mjs greet <name> [--shout]';
const [command, ...rest] = process.argv.slice(2);
const shout = rest.includes('--shout');
const name = rest.find(arg => arg !== '--shout');

if (command !== 'greet' || name === undefined) {
  console.error(usage);
  process.exit(1);
}

const text = greet(name);
console.log(shout ? text.toUpperCase() : text);
