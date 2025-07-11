import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 60000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:8787",

    /* Pass testRunPrefix to global-setup.cjs */
    launchOptions: {
      env: { PLAYWRIGHT_TEST_RUN_PREFIX: `test-${Math.random().toString(36).slice(2, 7)}` },
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  /* Run your local dev server before starting the tests */

  webServer: {
    command: "npm run dev --host",
    url: "http://localhost:8787",
    // We've set reuseExistingServer to false to ensure a clean environment for each test run.
    // This is crucial for stability, especially in CI.
    // If you're running tests locally and have a dev server running, you might want to set this to true.
    reuseExistingServer: false,
    timeout: 240 * 1000,
  },
  globalSetup: (await import('./e2e/global-setup.cjs')).setup,
  globalTeardown: (await import('./e2e/global-setup.cjs')).teardown,
});
