import { execSync } from 'node:child_process';
import * as fs from 'node:fs';

const typeMap = {
  feat: 'code',
  style: 'code',
  refactor: 'code',
  perf: 'code',
  revert: 'code',
  types: 'code',
  wip: 'code',
  chore: 'tool',
  build: 'tool',
  ci: 'tool',
  test: 'test',
  fix: 'bug',
  docs: 'doc',
};

function updateContributors(username, type) {
  const content = fs.readFileSync('.all-contributorsrc', 'utf-8');
  const contributors = JSON.parse(content);

  // 检查用户是否已存在
  const exists = contributors.contributors.some((contributor) => contributor.login === username);
  if (!exists) {
    console.log(`Adding new contributor: ${username}`);
    const command = `npx all-contributors-cli add ${username} ${type}`;
    execSync(command);
    console.log('Contributor added successfully.');
  } else {
    console.log('Contributor already exists, skipping...');
  }
}

function main() {
  const username = process.env.GITHUB_ACTOR;
  const lastCommitMessage = execSync('git log -1 --pretty=%B').toString().trim();
  const contributionType = typeMap[lastCommitMessage.split(' ')[0]] || 'code';

  updateContributors(username, contributionType);
}

main();