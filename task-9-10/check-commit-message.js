#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

// Define a regular expression pattern for a valid commit message
const commitMessagePattern =
  /^(feat|fix|chore|docs|style|refactor|perf|test)(\([a-zA-Z0-9-]+\))?: .{1,72}/;

// Read the commit message from the Git hook arguments
const commitMessageFile = process.argv[2];

// Read the commit message from the file
const commitMessage = fs.readFileSync(commitMessageFile, 'utf8').trim();

// Check if the commit message matches the pattern
if (!commitMessagePattern.test(commitMessage)) {
  console.error('Invalid commit message format:');
  console.error('Commit messages must follow the pattern:');
  console.error('<type>(<scope>): <message>');
  console.error(
    'Where <type> is feat, fix, chore, docs, style, refactor, perf, or test.',
  );
  console.error('Example: "feat(auth): implement user authentication"');
  process.exit(1);
}

// Exit with success if the commit message is valid
process.exit(0);
