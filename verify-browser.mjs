import playwright from '/Users/chiaclaw/.hermes/hermes-agent/node_modules/playwright/index.js';
const { chromium } = playwright;

const target = process.env.TARGET_URL || 'http://127.0.0.1:4184';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const consoleMessages = [];
const pageErrors = [];
page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));
page.on('pageerror', err => pageErrors.push(String(err)));

const response = await page.goto(target, { waitUntil: 'networkidle' });
const title = await page.title();
const hero = await page.locator('h1').first().textContent();
await page.locator('[data-open]').first().click();
await page.locator('[data-screen="brief"]').click();
const briefHeading = await page.locator('#briefTitle').textContent();
const queueLabel = await page.locator('#queueLabel').textContent();
const densityValue = await page.locator('#densitySelect').inputValue();
console.log(JSON.stringify({
  target,
  status: response?.status(),
  title,
  hero,
  briefHeading,
  queueLabel,
  densityValue,
  consoleMessages,
  pageErrors
}));
await browser.close();
