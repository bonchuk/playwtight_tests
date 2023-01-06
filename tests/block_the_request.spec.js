import { chromium, request, test } from '@playwright/test'

test('blocking google requests on the website', async ({ page }) => {

  // if we want to know what happens between requests back and fourth
  // page.on("request", req => console.log(`>> : ${req.method()} ${req.resourceType()} ${req.url()}`))
  // page.on("response", req => console.log(`<< : ${req.status()} ${req.url()}`))

  //if we dont want to load all images:
  // await page.route('**/*', route => {
  //   if (route.request().resourceType() === 'image') {
  //     return route.abort()
  //   }
  //   return route.continue()
  // })

  //if we dont want to load any resources
  // await page.route("**/*", (route, request) => {
  //   const unwantedResources = ["image", "script", "stylesheet", "font"];
  //   if (unwantedResources.includes(request.resourceType())) {
  //     route.abort();
  //   } else {
  //     route.continue();
  //   }
  // });

  // if we want to exclude any url requests that contains word "google"
  // await page.route("**/*", (route) => {
  //   route.request().url().includes("google")
  //      ? route.abort()
  //      : route.continue();
  //    return;
  //  });

  // виключаємо конкретні запити
  await page.route("**/*", (route, request) => {
    const urls_to_block = ['https://www.googletagmanager.com/gtm.js?id=GTM-NDK3GF',
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDR2J9XFNnRowvm6NkU523oXyVaktVqgc8&libraries=places%2Cgeometry&language=uk&callback=Drupal.Jysk.googleMapsReadyCallback']
    if (urls_to_block.includes(request.url())) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('https://jysk.ua/')
  await page.getByRole('button', { name: 'Прийняти все' }).click();
  await page.getByRole('main').getByRole('link', { name: 'Кухня та їдальня' }).click();
})