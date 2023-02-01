import {test, expect} from "@playwright/test";

test ('screenshot masks test', async ({page}) => {
  const username = page.locator('[data-test="username"]')
  const password = page.locator('[data-test="password"]')
  const login = page.locator('[data-test="login-button"]')
  const burger = page.getByRole('button', { name: 'Open Menu' })
  const logout = page.getByRole('link', { name: 'Logout' })
  const price = page.locator('.inventory_item_img')
  const photo = page.locator('.inventory_item_price')
  const decription = page.locator('.inventory_item_desc')

  await page.goto('https://www.saucedemo.com')
  await expect(page).toHaveTitle('Swag Labs')

  await username.click();
  await username.fill('standard_user');
  await password.click();
  await password.fill('secret_sauce');
  await login.click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

  await page.waitForLoadState('networkidle');
  
  const shot = await page.screenshot({
    fullPage: true,
    mask: [price, photo, decription]
  })

  expect(shot).toMatchSnapshot()

  await burger.click();
  await logout.click();
  await page.pause();
  await expect(page).toHaveURL('https://www.saucedemo.com')
})