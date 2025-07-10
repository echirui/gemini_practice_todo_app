const { execSync } = require('child_process');

module.exports = async () => {
  console.log('Global setup: Resetting D1 database...');
  try {
    execSync('wrangler d1 migrations apply --local DB', { stdio: 'inherit' });
    console.log('D1 database reset complete.');
  } catch (error) {
    console.error('Failed to reset D1 database:', error);
    process.exit(1);
  }
};