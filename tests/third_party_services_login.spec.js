import { expect, test } from '@playwright/test'

test('login test', async ({ page, context }) => {
  
  await context.addCookies([{ name: "NOT_VISIBLE_MODAL", value: "true", domain: "megasport.ua", path: "/", secure: true, sameSite: "None" }]);

  await page.route("**/*", (route, request) => {
    const urlsToBlock = new Set(
      [
        'https://www.google-analytics.com/plugins/ua/ec.js',
        'https://www.googletagmanager.com/gtag/js?id=DC-10562591',
        'https://www.google-analytics.com/analytics.js',
        'https://www.googletagmanager.com/gtm.js?id=GTM-NGHVLK&gtm_auth=X9lKFjHCJ8YRltmXdperGw&gtm_preview=env-1&gtm_cookies_win=x'
      ])
    if (urlsToBlock.has(request.url())) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('https://megasport.ua/ua/authorization/');

  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Google' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Email or phone' }).fill('memcrab.test@gmail.com');
  await page1.getByRole('button').nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your password' }).fill('cigto2-coPmor-xizgut');

  const navigationPromise = page.waitForNavigation({url:'https://megasport.ua/'});
  await page1.locator('#passwordNext').click()
  await navigationPromise;

  await expect(page).toHaveURL('https://megasport.ua/');
  await page.locator('._O0dT7 > a').first().click();
  await page.getByRole('button', { name: 'Вийти' }).click();
})
