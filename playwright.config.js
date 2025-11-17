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
    workers: process.env.CI ? 4 : undefined,
    reporter: [
        ['html', {outputFolder: 'test-artifacts/report', open: 'never'}],
        ['json', {outputFile: 'test-artifacts/report.json'}],
        ['list'],
    ],
    maxFailures: 30,

    // disable useless artifacts
    use: {
        trace: {mode: 'off', screenshots: true, sources: false},
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
        env: {
            DISABLE_WATCHER: true,
        },
    },
});
