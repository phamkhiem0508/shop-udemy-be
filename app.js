import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";

(async () => {
  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true,executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });


  await browser.createIncognitoBrowserContext();
  
  const page = await browser.newPage();

  await page.goto("https://www.udemy.com/course/ios-13-app-development-bootcamp/");

  // Set screen size

  await page.waitForSelector(".ud-text-with-links");

  const element = await page.$("button[data-testid='smart-bar-opt-in-cta']");

  element.click();

  await page.waitForNavigation();

  await page.waitForSelector("div[data-purpose='price-text-container'] div[data-purpose='course-price-text'] .ud-sr-only + span");

  const price = await page.$("div[data-purpose='price-text-container'] div[data-purpose='course-price-text'] .ud-sr-only + span");

  let value = await page.evaluate(el => el.textContent, price)

  console.log(value);




  // Type into search box
  //   await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  //   const searchResultSelector = '.ud-text-with-links';
  //   const textSelector = await page.waitForSelector(searchResultSelector);

  //   // Locate the full title with a unique string
  // //   const textSelector = await page.waitForSelector(
  // //     'text/Customize and automate'
  // //   );

  //   const fullTitle = await textSelector?.evaluate(el => el.textContent);

  //   // Print the full title
  //   console.log('The title of this blog post is "%s".', fullTitle);

    // await browser.close();
})();
