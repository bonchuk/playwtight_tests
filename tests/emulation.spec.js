
import { test, expect } from '@playwright/test';

test('test', async ({ page, isMobile }) => {
  await page.goto('https://playwright.dev/');

  if (isMobile) {
    await page.getByRole('button', { name: 'Toggle navigation bar' }).click();
  }

  await page.getByRole('link', { name: 'Docs' }).click();

  if (isMobile) {
    await page.getByRole('button', { name: 'Toggle navigation bar' }).click();
  }
  
  await page.getByRole('link', { name: 'Screenshots' }).click();
  await page.getByRole('code').filter({ hasText: 'await page.screenshot({ path: \'screenshot.png\' });' }).hover();
  await page.getByRole('button', { name: 'Copy code to clipboard' }).first().click();
  await page.getByRole('link', { name: 'Element screenshot' }).first().click();
  await page.getByRole('link', { name: 'Next Test Generator »' }).click();
  await page.getByRole('link', { name: 'Next Trace Viewer »' }).click();

  if (isMobile) {
    await page.getByRole('button', { name: 'Toggle navigation bar' }).click();
    await page.getByRole('button', { name: 'Close navigation bar' }).click();
  }

  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByPlaceholder('Search docs').fill('hover');
  await page.getByRole('link', { name: 'hover​ ElementHandle' }).click();
  await page.getByRole('link', { name: 'Playwright logo Playwright' }).click();
});
