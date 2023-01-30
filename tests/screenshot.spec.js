import { test, expect } from '@playwright/test';
import { globalTimeout } from '../playwright.config';

  test.use({ viewport: { width: 600, height: 900 } });
  test('portrait test', async ({ page, context }) => {

    await context.tracing.start({snapshots:true, screenshots:true})

    const login = page.locator('#user-name');
    const password = page.locator('#password');

    await page.goto('https://www.saucedemo.com');
    await login.click();
    await login.fill('standard_user');
    await expect(login).toHaveAttribute('value', 'standard_user');

    await password.press('Tab');
    await expect(password).toHaveClass(['input_error form_input']);
    await password.fill('secret_sauce');
    await expect(password).toHaveAttribute('value', 'secret_sauce');

    await page.locator('[id="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.screenshot({ path: 'tests/screenshot.spec.js-snapshots/screenshot.png', fullPage: true });
    await page.locator('[id="item_3_img_link"]').click();

    await page.locator('[id="react-burger-menu-btn"]').click();
    await expect(page).toHaveScreenshot();

    await page.locator('[id="logout_sidebar_link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com');

    await context.tracing.stop({path:'test-trace.zip'})
});
