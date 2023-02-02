import { test, expect } from '@playwright/test'

test('mocking data test', async ({ page }) => {

  const username = page.locator('[data-test="username"]')
  const password = page.locator('[data-test="password"]')
  const login = page.locator('[data-test="login-button"]')
  const burger = page.getByRole('button', { name: 'Open Menu' })
  const logout = page.getByRole('link', { name: 'Logout' })

  await page.route("**/*", (route, request) => {
    const mockingUrls = new Set(['https://www.saucedemo.com/static/media/Login_Bot_graphic.20658452.png',
      'https://www.saucedemo.com/static/media/red-tatt-1200x1500.e32b4ef9.jpg',
      'https://www.saucedemo.com/static/media/red-onesie-1200x1500.1b15e1fa.jpg',
      'https://www.saucedemo.com/static/media/sauce-pullover-1200x1500.439fc934.jpg',
      'https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c0dae290.jpg',
      'https://www.saucedemo.com/static/media/bike-light-1200x1500.a0c9caae.jpg',
      'https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.34e7aa42.jpg',
    ])

    if (mockingUrls.has(request.url())) {
      route.fulfill({
        contentType: 'image/jpeg',
        path: 'tests/images/crab-icon.png',
      });
    } else {
      route.continue();
    }
  })

  await page.goto('https://www.saucedemo.com')

  await expect(page).toHaveTitle('Swag Labs')
  expect(await page.screenshot({fullPage: true})).toMatchSnapshot(
    {
      maxDiffPixels: 2767
    }
  );

  await username.click()
  await username.fill('standard_user')
  await password.click()
  await password.fill('secret_sauce')
  await login.click()

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  expect(await page.locator('.inventory_list').screenshot()).toMatchSnapshot();

  await burger.click()
  await logout.click()

  await expect(page).toHaveURL('https://www.saucedemo.com')
  expect(await page.screenshot({fullPage: true})).toMatchSnapshot(
    {
      maxDiffPixels: 2767
    }
  );
})
