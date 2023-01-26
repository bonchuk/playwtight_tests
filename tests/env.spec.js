import { test } from '@playwright/test'

test('login test with .env data', async ({ page }) => {

  await page.goto('https://megasport.ua/ua/authorization/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Google' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Електронна адреса або номер телефону' }).fill(process.env.USERNAME);
  await page1.getByRole('button', { name: 'Далі' }).click();
  await page1.getByRole('textbox', { name: 'Введіть пароль' }).fill(process.env.PASSWORD);

  const navigationPromise = page.waitForNavigation();
  await page1.locator('#passwordNext').click()
  await navigationPromise;

  await page.locator('._O0dT7 > a').first().click();
  await page.getByRole('button', { name: 'Вийти' }).click();
})