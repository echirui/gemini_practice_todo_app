const { execSync } = require('child_process');

module.exports = {
  async setup() {
    console.log('Global setup: Resetting D1 database...');
    try {
      execSync('rm -rf .wrangler', { stdio: 'inherit' });
      console.log('D1 database reset complete.');
    } catch (error) {
      console.error('Failed to reset D1 database:', error);
      process.exit(1);
    }
  },

  async teardown() {
    console.log('Global teardown: Cleaning up test data...');
    try {
      // Get the testRunPrefix from the environment variable set by Playwright
      const testRunPrefix = process.env.PLAYWRIGHT_TEST_RUN_PREFIX;
      console.log(`Teardown: PLAYWRIGHT_TEST_RUN_PREFIX = ${testRunPrefix}`);
      if (testRunPrefix) {
        // Execute SQL to delete tasks created during the test run
        const command = `wrangler d1 execute DB --command "DELETE FROM tasks WHERE title LIKE '${testRunPrefix}-%'"`;
        console.log(`Teardown: Executing command: ${command}`);
        execSync(command, { stdio: 'inherit' });
        console.log(`Cleaned up test data with prefix: ${testRunPrefix}`);
      } else {
        console.log('No testRunPrefix found, skipping test data cleanup.');
      }
      console.log('Test data cleanup complete.');
    } catch (error) {
      console.error('Failed to clean up test data:', error);
      process.exit(1);
    }
  },
};