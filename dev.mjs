import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const useShell = process.platform === 'win32';

const api = spawn(npmCommand, ['run', 'api'], {
  stdio: 'inherit',
  shell: useShell,
});

const ui = spawn(npmCommand, ['run', 'dev:ui'], {
  stdio: 'inherit',
  shell: useShell,
});

const shutdown = (signal) => {
  if (!api.killed) api.kill(signal);
  if (!ui.killed) ui.kill(signal);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

api.on('exit', (code) => {
  if (code !== 0) {
    shutdown('SIGTERM');
    process.exit(code ?? 1);
  }
});

ui.on('exit', (code) => {
  if (code !== 0) {
    shutdown('SIGTERM');
    process.exit(code ?? 1);
  }
});
