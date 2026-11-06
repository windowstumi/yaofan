import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'

const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
export default defineConfig({
  testDir: './tests/browser',
  outputDir: '.qa/test-results',
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    viewport: { width: 1440, height: 1000 },
    launchOptions: { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || (existsSync(edge) ? edge : undefined) },
  },
  webServer: { command: 'npm run dev:h5', url: 'http://localhost:5173', reuseExistingServer: true },
})
