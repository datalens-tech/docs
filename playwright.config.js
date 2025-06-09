const {defineConfig, devices} = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 10 * 1000,
    expect: {
        timeout: 1000,
    },
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: 0,
    // workers: process.env.CI ? 1 : undefined,
    reporter: 'list',

    // disable all artifacts
    use: {
        trace: 'off',
        screenshot: 'off',
        video: 'off',
    },
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
    ],
    webServer: {
        command: 'npm run dev',
        stderr: 'pipe',
        stdout: 'pipe',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 30 * 1000,
    },
});
