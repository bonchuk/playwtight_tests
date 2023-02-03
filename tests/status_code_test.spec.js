import { test } from '@playwright/test'

test('test', async ({ page }) => {

  const response = await page.request.get('https://jysk.ua');
  console.log('The main page status = ', response.status());

  await page.route("**/*", (route, request) => {
    const urlsToBlock = new Set(['https://www.googletagmanager.com/gtm.js?id=GTM-NDK3GF',
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDR2J9XFNnRowvm6NkU523oXyVaktVqgc8&libraries=places%2Cgeometry&language=uk&callback=Drupal.Jysk.googleMapsReadyCallback'])
    if (urlsToBlock.has(request.url())) {
      route.fulfill({
        status: 404
      })
    } else {
      route.continue();
    }
  });

  page.on("response", req => console.log(`status = ${req.status()} url : ${req.url()}`))

  await page.goto('https://jysk.ua/')
})
