import { execSync } from 'child_process';

async function globalSetup() {
  console.log('Global setup: Resetting D1 database...');
  try {
    execSync('wrangler d1 migrations apply --local DB --force', { stdio: 'inherit' });
    console.log('D1 database reset complete.');
  } catch (error) {
    console.error('Failed to reset D1 database:', error);
    process.exit(1);
  }
}

export default globalSetup;