import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  step: (msg) => console.log(`\n${colors.bright}${colors.blue}→${colors.reset} ${colors.bright}${msg}${colors.reset}`),
};

// Read package.json to get current version
const getCurrentVersion = () => {
  const pkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
  return pkg.version;
};

// Check if git worktree is clean
const checkGitStatus = () => {
  log.step('Checking git status...');
  try {
    const status = execSync('git status --porcelain', { 
      encoding: 'utf-8',
      cwd: rootDir 
    }).trim();
    
    if (status) {
      log.error('Git worktree is not clean!');
      console.log('\nModified/untracked files:');
      console.log(status.split('\n').map(line => `  ${line}`).join('\n'));
      console.log('\nPlease commit or stash your changes before publishing.');
      process.exit(1);
    }
    
    log.success('Git worktree is clean');
    return true;
  } catch (error) {
    log.error('Failed to check git status');
    console.error(error.message);
    process.exit(1);
  }
};

// Prompt user for version bump choice
const promptVersionBump = () => {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const currentVersion = getCurrentVersion();
    console.log(`\n${colors.bright}Current version: ${colors.cyan}${currentVersion}${colors.reset}`);
    console.log('\nChoose version bump:');
    console.log('  1) patch (0.2.5 → 0.2.6)');
    console.log('  2) minor (0.2.5 → 0.3.0)');
    console.log('  3) major (0.2.5 → 1.0.0)');
    console.log('  4) skip (no version bump)');
    
    rl.question('\nEnter choice (1-4) [default: 1]: ', (answer) => {
      rl.close();
      const choice = answer.trim() || '1';
      let versionType = null;
      
      switch (choice) {
        case '1':
          versionType = 'patch';
          break;
        case '2':
          versionType = 'minor';
          break;
        case '3':
          versionType = 'major';
          break;
        case '4':
          versionType = null;
          break;
        default:
          log.warning('Invalid choice, defaulting to patch');
          versionType = 'patch';
      }
      
      resolve(versionType);
    });
  });
};

// Prompt user for optional npm install
const promptNpmInstall = () => {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    rl.question('\nRefresh dependencies? (y/n) [default: n]: ', (answer) => {
      rl.close();
      const shouldInstall = answer.trim().toLowerCase() === 'y' || answer.trim().toLowerCase() === 'yes';
      resolve(shouldInstall);
    });
  });
};

// Execute command with error handling
const runCommand = (command, description) => {
  try {
    log.step(description);
    execSync(command, { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    log.success(`${description} completed`);
    return true;
  } catch (error) {
    log.error(`${description} failed`);
    console.error(error.message);
    return false;
  }
};

// Main publishing workflow
const main = async () => {
  console.log(`\n${colors.bright}${colors.blue}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}  Interactive Publishing Workflow${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}═══════════════════════════════════════${colors.reset}\n`);
  
  // Step 1: Check git status
  checkGitStatus();
  
  // Step 2: Prompt for version bump
  const versionType = await promptVersionBump();
  
  if (versionType) {
    if (!runCommand(
      `npm version ${versionType}`,
      `Bumping version (${versionType})`
    )) {
      process.exit(1);
    }
    const updatedVersion = getCurrentVersion();
    log.info(`Version bumped to ${updatedVersion}`);
  } else {
    log.info('Skipping version bump');
  }
  
  // Step 3: Optional npm install
  const shouldInstall = await promptNpmInstall();
  if (shouldInstall) {
    if (!runCommand('npm install --ignore-scripts', 'Refreshing dependencies')) {
      process.exit(1);
    }
  }
  
  // Step 4: Compile themes
  if (!runCommand('npm run compile-themes:sd', 'Compiling themes')) {
    process.exit(1);
  }
  
  // Step 5: Build library
  if (!runCommand('npm run build', 'Building library')) {
    process.exit(1);
  }
  
  // Step 6: Publish
  if (!runCommand('npm publish', 'Publishing to npm')) {
    process.exit(1);
  }
  
  // Step 7: Push to git
  log.step('Pushing to git repository');
  try {
    // Get current branch name
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
      cwd: rootDir
    }).trim();
    
    // Try to push, set upstream if needed
    try {
      execSync('git push', { 
        stdio: 'inherit',
        cwd: rootDir 
      });
    } catch (pushError) {
      // If push fails, try setting upstream
      log.info('Setting upstream branch...');
      execSync(`git push --set-upstream origin ${currentBranch}`, { 
        stdio: 'inherit',
        cwd: rootDir 
      });
    }
    
    // Push tags
    execSync('git push --tags', { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    log.success('Pushed to git repository');
  } catch (error) {
    log.error('Failed to push to git repository');
    console.error(error.message);
    log.warning('Package was published, but git push failed. Please push manually.');
    process.exit(1);
  }
  
  console.log(`\n${colors.bright}${colors.green}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.green}  Publishing completed successfully!${colors.reset}`);
  console.log(`${colors.bright}${colors.green}═══════════════════════════════════════${colors.reset}\n`);
};

// Run the script
main().catch((error) => {
  log.error('Unexpected error occurred');
  console.error(error);
  process.exit(1);
});

