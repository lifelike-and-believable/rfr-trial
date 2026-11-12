#!/usr/bin/env node
import { greet, farewell } from './greet.mjs';

const greetUsage = 'Usage: node src/cli.mjs greet <name> [--shout]';
const farewellUsage = 'Usage: node src/cli.mjs farewell <name>';
const [command, ...rest] = process.argv.slice(2);

if (command === 'farewell') {
  const name = rest[0];
  if (name === undefined) {
    console.error(farewellUsage);
    process.exit(1);
  }
  console.log(farewell(name));
} else {
  const shout = rest.includes('--shout');
  const name = rest.find(arg => arg !== '--shout');

  if (command !== 'greet' || name === undefined) {
    console.error(greetUsage);
    process.exit(1);
  }

  const text = greet(name);
  console.log(shout ? text.toUpperCase() : text);
}
