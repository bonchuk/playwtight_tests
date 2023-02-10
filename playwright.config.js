// @ts-check
const { devices } = require('@playwright/test');
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  webServer: [
    {
      command: 'npm run start',
      port: 3000,
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    }
  ],
  use: {
    baseURL: 'http://localhost:3000/',
  },
});

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
// import * as dotenv from 'dotenv'
// dotenv.config({
//   path: '.env'
// })

require('dotenv-vault-core').config()

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: process.env.CI ? 300 * 1000 : 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: process.env.CI ? 30000 : 15000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // video: 'on',
    // launchOptions: {
    //   slowMo: 1000
    // },
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: process.env.CI ? 60000 : 10000,
    navigationTimeout: process.env.CI ? 60000 : 10000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      }
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    {
      name: 'Mobile Safari',
      testMatch: 'tests/emulation.spec.js',
      use: {
        ...devices['iPhone 12'],
        colorScheme: 'dark',
      },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
    // command: 'npm run dev --port 8080',
    // port: 8080,
    // reuseExistingServer: true
};

module.exports = config;
