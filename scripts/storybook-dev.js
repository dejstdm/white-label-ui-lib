import { spawn, spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compileScript = path.join(__dirname, 'compile-themes-sd.js');

const storybookArgs = process.argv.slice(2);
const hasPortArg = storybookArgs.some(arg => arg === '-p' || arg === '--port' || arg.startsWith('--port='));

const initialBuild = spawnSync(process.execPath, [compileScript], { stdio: 'inherit' });
if (initialBuild.status && initialBuild.status !== 0) {
  process.exit(initialBuild.status);
}

const themeWatcher = spawn(
  process.execPath,
  [compileScript, '--watch', '--no-initial'],
  { stdio: 'inherit' }
);

const storybook = spawn(
  'storybook',
  ['dev', ...(hasPortArg ? [] : ['-p', '6006']), ...storybookArgs],
  { stdio: 'inherit', shell: process.platform === 'win32' }
);

function shutdown(code = 0) {
  if (!themeWatcher.killed) {
    themeWatcher.kill('SIGTERM');
  }
  if (!storybook.killed) {
    storybook.kill('SIGTERM');
  }
  process.exit(code);
}

storybook.on('exit', code => shutdown(code ?? 0));
themeWatcher.on('exit', code => {
  if (code && code !== 0) {
    shutdown(code);
  }
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
