import { test, expect } from '@playwright/test'

test.describe('PC assembly', () => {


  test.beforeEach(async ({ page }) => {

    await page.route("**/*", (route, request) => {
      const urls_to_block = ['https://www.googletagservices.com/tag/js/gpt.js',
        'https://www.googletagmanager.com/gtm.js?id=GTM-N4LDSTX',
        'https://www.google-analytics.com/gtm/optimize.js?id=GTM-PN45D27',
        'https://www.google-analytics.com/analytics.js',
        'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/964380755/?random=1673617612808&cv=11&fst=1673617612808&bg=ffffff&guid=ON&async=1&gtm=2wg1a1&u_w=1280&u_h=720&hn=www.googleadservices.com&frm=0&url=https%3A%2F%2Frozetka.com.ua%2Fua%2F&tiba=%D0%86%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%20ROZETKA%E2%84%A2%3A%20%D0%BE%D1%84%D1%96%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B0%D0%B9%D1%82%20%D0%BD%D0%B0%D0%B9%D0%BF%D0%BE%D0%BF%D1%83%D0%BB%D1%8F&auid=831961265.1673613958&uaa=arm&uab=64&uafvl=Chromium%3B109.0.5414.46%7CNot_A%2520Brand%3B99.0.0.0&uap=macOS&uapv=12.6.0&uaw=0&data=ecomm_pagetype%3DMain%3Becomm_totalvalue%3D0%3Bdynx_totalvalue%3D0%3Bdynx_pagetype%3DMain%3Bdynx_itemid2%3D0%3Becomm_pcat%3D(not%20set)%3Becomm_pname%3D(not%20set)&rfmt=3&fmt=4',
        'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/967924631/?random=1673617612811&cv=11&fst=1673617612811&bg=ffffff&guid=ON&async=1&gtm=2wg1a1&u_w=1280&u_h=720&label=K55HCOH94wMQl7fFzQM&hn=www.googleadservices.com&frm=0&url=https%3A%2F%2Frozetka.com.ua%2Fua%2F&tiba=%D0%86%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%20ROZETKA%E2%84%A2%3A%20%D0%BE%D1%84%D1%96%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B0%D0%B9%D1%82%20%D0%BD%D0%B0%D0%B9%D0%BF%D0%BE%D0%BF%D1%83%D0%BB%D1%8F&value=0&auid=831961265.1673613958&uaa=arm&uab=64&uafvl=Chromium%3B109.0.5414.46%7CNot_A%2520Brand%3B99.0.0.0&uap=macOS&uapv=12.6.0&uaw=0&data=prodid%3D(not%20set)%3Bpname%3D(not%20set)%3Bpcat%3D(not%20set)&rfmt=3&fmt=4',
        'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/529222180/?random=1673617612827&cv=11&fst=1673617612827&bg=ffffff&guid=ON&async=1&gtm=2wg1a1&u_w=1280&u_h=720&hn=www.googleadservices.com&frm=0&url=https%3A%2F%2Frozetka.com.ua%2Fua%2F&tiba=%D0%86%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%20ROZETKA%E2%84%A2%3A%20%D0%BE%D1%84%D1%96%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B0%D0%B9%D1%82%20%D0%BD%D0%B0%D0%B9%D0%BF%D0%BE%D0%BF%D1%83%D0%BB%D1%8F&auid=831961265.1673613958&uaa=arm&uab=64&uafvl=Chromium%3B109.0.5414.46%7CNot_A%2520Brand%3B99.0.0.0&uap=macOS&uapv=12.6.0&uaw=0&data=ecomm_pagetype%3DMain%3Becomm_totalvalue%3D0%3Becomm_pcat%3D(not%20set)%3Becomm_pname%3D(not%20set)&rfmt=3&fmt=4'];

      if (urls_to_block.includes(request.url())) {
        route.abort();
      } else {
        route.continue();
      }
    });

    await page.goto('https://rozetka.com.ua/ua/')
    await page.getByRole('link', { name: 'Товари для геймерів' }).click();
    await page.waitForURL('https://rozetka.com.ua/ua/game-zone/c80261/');
    await page.getByText('Комплектуючі для геймерів').click();
    await page.waitForURL('https://rozetka.com.ua/ua/komplektuyushchie-dlya-geymerov/c4668373/');
  })

  test.afterAll(async ({ page }) => {
    await page.close()
  })

  test('picking a motherboard', async ({ page }) => {

    await page.getByRole('link', { name: 'Материнські плати' }).filter({ hasText: 'Материнські плати' }).click();
    await page.getByRole('link', { name: 'Материнська плата Asus TUF Gaming B550-Plus (sAM4, AMD B550, PCI-Ex16)' }).filter({ hasText: 'Материнська плата Asus TUF Gaming B550-Plus (sAM4, AMD B550, PCI-Ex16)' }).click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/asus_tuf_gaming_b550_plus/p218402767/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await expect(page.getByTestId('title')).toContainText('Материнська плата Asus TUF Gaming B550-Plus (sAM4, AMD B550, PCI-Ex16)')
  })

  test('picking a power supply unit', async ({ page }) => {

    await page.getByRole('link', { name: 'Блоки живлення' }).first().click();
    await page.getByRole('link', { name: 'Блок живлення RZTK PcCooler HW600-NP' }).filter({ hasText: 'Блок живлення RZTK PcCooler HW600-NP' }).click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/rztk_hw600_np/p349957428/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await expect(page.getByTestId('title')).toContainText('Блок живлення RZTK PcCooler HW600-NP')
  })

  test('picking a proceccor', async ({ page }) => {

    await page.getByRole('link', { name: 'Процесори' }).first().click();
    await page.getByRole('link', { name: 'Процесор AMD Ryzen 9 5900X 3.7 GHz / 64 MB (100-100000061WOF) sAM4 BOX' }).filter({ hasText: 'Процесор AMD Ryzen 9 5900X 3.7 GHz / 64 MB (100-100000061WOF) sAM4 BOX' }).click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/amd_100-100000061wof/p260365486/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await expect(page.getByTestId('title')).toContainText('Процесор AMD Ryzen 9 5900X 3.7 GHz / 64 MB (100-100000061WOF) sAM4 BOX')
  })

  test('picking a videocard', async ({ page }) => {

    await page.getByRole('link', { name: 'Відеокарти' }).filter({ hasText: 'Відеокарти' }).click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/videocards/c80087/21805=7116/');
    await page.getByRole('link', { name: 'Gigabyte PCI-Ex GeForce RTX 3050 Gaming OC 8G 8 GB GDDR6 (128 bit) (14000) (2 х HDMI, 2 x DisplayPort) (GV-N3050GAMING OC-8GD)' }).filter({ hasText: 'Gigabyte PCI-Ex GeForce RTX 3050 Gaming OC 8G 8 GB GDDR6 (128 bit) (14000) (2 х ' }).click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/gigabyte-gv-n3050gaming-oc-8gd/p333794275/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await expect(page.getByTestId('title')).toContainText('Gigabyte PCI-Ex GeForce RTX 3050 Gaming OC 8G 8 GB GDDR6 (128 bit) (14000) (2 х HDMI, 2 x DisplayPort) (GV-N3050GAMING OC-8GD)')
  })

  test('picking a RAM', async ({ page }) => {

    await page.getByRole('list').filter({ hasText: 'Відеокарти Процесори Оперативна пам\'ять Материнські плати' }).getByRole('link', { name: 'Оперативна пам\'ять' }).first().click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/memory/c80081/21256=3370/');
    await page.getByRole('link', { name: 'Оперативна пам\'ять Kingston Fury DDR4-3200 32768 MB PC4-25600 (Kit of 2x16384) Beast Black (KF432C16BB1K2/32)' }).first().click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/kingston_fury_kf432c16bb1k2_32/p310064098/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await expect(page.getByTestId('title')).toContainText('Оперативна пам\'ять Kingston Fury DDR4-3200 32768 MB PC4-25600 (Kit of 2x16384) Beast Black (KF432C16BB1K2/32)')
  })

  test('picking a Hard Drive', async ({ page }) => {

    await page.getByRole('link', { name: 'Жорсткі диски' }).filter({ hasText: 'Жорсткі диски' }).click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/hdd/c80084/');
    await page.getByRole('link', { name: 'Жорсткий диск Western Digital Blue 1TB 7200rpm 64MB WD10EZEX 3.5 SATA III' }).first().click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/western_digital_wd10ezex/p231137/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await expect(page.getByTestId('title')).toContainText('Жорсткий диск Western Digital Blue 1TB 7200rpm 64MB WD10EZEX 3.5 SATA III')
  })

  test('picking a Frame', async ({ page }) => {

    await page.getByRole('link', { name: 'Корпуси' }).first().click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/cases/c80090/21798=7120/');
    await page.getByRole('link', { name: 'Корпус NZXT H510 Matte Black-Red (CA-H510B-BR)' }).first().click();
    await page.waitForURL('https://hard.rozetka.com.ua/ua/nzxt_ca_h510b_br/p119862523/');
    await page.locator('rz-product-buy-btn').getByRole('button', { name: 'Купити' }).click();
    await page.goto('https://hard.rozetka.com.ua/ua/cart/')
    await expect(page.getByTestId('title')).toContainText('Корпус NZXT H510 Matte Black-Red (CA-H510B-BR)')
  })
})
