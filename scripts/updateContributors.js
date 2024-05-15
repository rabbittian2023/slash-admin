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
  console.log('contributors: ', contributors);
  console.log('username', username);
  // 检查用户是否已存在
  const exists = contributors.contributors.some((contributor) => contributor.login === username);
  if (!exists) {
    console.log(`Adding new contributor: ${username}`);
    const command = `npx all-contributors-cli add ${username} ${type}`;
    execSync(command);
    console.log('Contributor added successfully.');
    
    // Generate the contributors list after adding a new contributor
    console.log('Generating contributors list...');
    const generateCommand = 'npx all-contributors-cli generate';
    execSync(generateCommand);
    console.log('Contributors list updated.');
  } else {
    console.log('Contributor already exists, skipping...');
  }
}

function main() {
  const username = process.env.GITHUB_ACTOR;
  console.log('fix: 111updateContribcutors.js - GITHUB_ACTOR :>> ', process.env.GITHUB_ACTOR);
  console.log('username :>> ', username);
  const lastCommitMessage = execSync('git log -1 --pretty=%B').toString().trim();
  const contributionType = typeMap[lastCommitMessage.split(' ')[0]] || 'code';

  updateContributors(username, contributionType);
}

main();

// 测试all contributorsrc
// test1
// test2
// test3
// test4
// test5
// test6
// test7
// test8
// test9
// test10
// test10
// test11
// test12
// test13
// test14
// test15
// test16
// 测试1
// 测试2
// 测试3
// 测试4
// 测试5
// 测试6
// 测试7
// 测试8
// 测试9
// 测试10
// 测试11
// 测试12
// 测试13
