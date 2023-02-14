import { test, expect } from '@playwright/test'

test.describe('PC assembly', () => {
  // let count = 0;

  let links_to_block = new Set([])

  test.beforeEach(async ({ page }) => {

    await page.route("**/*", (route, request) => {

      const url = [
        'https://adservice.',
        'https://googleads.',
        'https://www.googletagservices.',
        'https://www.googletagmanager.',
        'https://www.google-analytics.',
        'https://www.google.com.ua/ads/'
      ];

      for (let link of url) {
        if (request.url().startsWith(link)) {
          links_to_block.add(request.url())
        }
      }

      if (links_to_block.has(request.url())) {
        route.abort();
      } else {
        route.continue();
      }
    });

    // page.on("response", req => console.log(`<< : ${req.url().includes('google') ? count++ && req.url() : false
    //   }`))

    await page.goto('https://rozetka.com.ua/ua/')
    await page.getByRole('link', { name: 'Товари для геймерів' }).click();
    await page.waitForURL('https://rozetka.com.ua/ua/game-zone/c80261/');
    await page.getByText('Комплектуючі для геймерів').click();
    await page.waitForURL('https://rozetka.com.ua/ua/komplektuyushchie-dlya-geymerov/c4668373/');
  })

  test.afterEach(async ({ page }) => {
    // console.log(count);
    await page.close()
  })

  test('picking a motherboard', async ({ page }) => {

    await page.locator('.tile-cats').filter({ hasText: 'Материнські плати' }).click()
    await page.locator('.goods-tile__title').filter({ hasText: 'Материнська плата Asus TUF Gaming B550-Plus (sAM4, AMD B550, PCI-Ex16)' }).click()

    await page.waitForURL('https://hard.rozetka.com.ua/ua/asus_tuf_gaming_b550_plus/p218402767/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByTestId('title')).toContainText('Материнська плата Asus TUF Gaming B550-Plus (sAM4, AMD B550, PCI-Ex16)')
  })

  test('picking a power supply unit', async ({ page }) => {

    await page.locator('.tile-cats').filter({ hasText: 'Блоки живлення' }).click()
    await page.locator('.goods-tile__title').filter({ hasText: 'Блок живлення RZTK PcCooler HW600-NP' }).click()

    await page.waitForURL('https://hard.rozetka.com.ua/ua/rztk_hw600_np/p349957428/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByTestId('title')).toContainText('Блок живлення RZTK PcCooler HW600-NP')
  })

  test('picking a proceccor', async ({ page }) => {

    await page.locator('.tile-cats').filter({ hasText: 'Процесори' }).click()
    await page.locator('.goods-tile__title').filter({ hasText: 'Процесор AMD Ryzen 9 5900X 3.7 GHz / 64 MB (100-100000061WOF) sAM4 BOX' }).click()

    await page.waitForURL('https://hard.rozetka.com.ua/ua/amd_100-100000061wof/p260365486/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByTestId('title')).toContainText('Процесор AMD Ryzen 9 5900X 3.7 GHz / 64 MB (100-100000061WOF) sAM4 BOX')
  })

  test('picking a videocard', async ({ page }) => {

    await page.locator('.tile-cats').filter({ hasText: 'Відеокарти' }).click()
    await page.waitForURL('https://hard.rozetka.com.ua/ua/videocards/c80087/21805=7116/');
    await page.locator('.goods-tile__title').filter({ hasText: 'Gigabyte PCI-Ex GeForce RTX 3050 Gaming OC 8G 8 GB GDDR6 (128 bit) (14000) (2 х HDMI, 2 x DisplayPort) (GV-N3050GAMING OC-8GD)' }).click()

    await page.waitForURL('https://hard.rozetka.com.ua/ua/gigabyte-gv-n3050gaming-oc-8gd/p333794275/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByTestId('title')).toContainText('Gigabyte PCI-Ex GeForce RTX 3050 Gaming OC 8G 8 GB GDDR6 (128 bit) (14000) (2 х HDMI, 2 x DisplayPort) (GV-N3050GAMING OC-8GD)')
  })

  test('picking a RAM', async ({ page }) => {

    await page.locator('.tile-cats').filter({ hasText: 'Оперативна пам\'ять' }).click()
    await page.waitForURL('https://hard.rozetka.com.ua/ua/memory/c80081/21256=3370/');
    await page.pause()
    await page.locator('.goods-tile__title').filter({ hasText: 'Оперативна пам\'ять Kingston Fury DDR5-4800 32768 MB PC5-38400 (Kit of 2x16384) Beast Black (KF548C38BBK2-32)' }).click()

    await page.waitForURL('https://hard.rozetka.com.ua/ua/kingston-fury-exhyperx-kf548c38bbk2-32/p324175480/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByTestId('title')).toContainText('Оперативна пам\'ять Kingston Fury DDR5-4800 32768 MB PC5-38400 (Kit of 2x16384) Beast Black (KF548C38BBK2-32)')
  })

  test('picking a Hard Drive', async ({ page }) => {

    await page.locator('.tile-cats').filter({ hasText: 'Жорсткі диски' }).click()
    await page.waitForURL('https://hard.rozetka.com.ua/ua/hdd/c80084/');
    await page.locator('.goods-tile__title').filter({ hasText: 'Жорсткий диск Western Digital Blue 1TB 7200rpm 64MB WD10EZEX 3.5 SATA III' }).click()

    await page.waitForURL('https://hard.rozetka.com.ua/ua/western_digital_wd10ezex/p231137/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByTestId('title')).toContainText('Жорсткий диск Western Digital Blue 1TB 7200rpm 64MB WD10EZEX 3.5 SATA III')
  })

  test('picking a Frame', async ({ page }) => {

    await page.locator('.tile-cats').filter({ hasText: 'Корпуси' }).click()
    await page.waitForURL('https://hard.rozetka.com.ua/ua/cases/c80090/21798=7120/');
    await page.locator('.goods-tile__title').filter({ hasText: 'Корпус NZXT H510 Matte Black-Red (CA-H510B-BR)' }).click()

    await page.waitForURL('https://hard.rozetka.com.ua/ua/nzxt_ca_h510b_br/p119862523/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByTestId('title')).toContainText('Корпус NZXT H510 Matte Black-Red (CA-H510B-BR)')
  })
})
