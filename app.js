import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";

const getPrice = async () => {
  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    // executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    // args: [ '--proxy-server=http:/188.132.222.234:8080' ]
  });

  await browser.createIncognitoBrowserContext();

  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on("request", (interceptedRequest) => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;
    if (
      interceptedRequest.url().endsWith(".png") ||
      interceptedRequest.url().endsWith(".jpg") ||
      interceptedRequest.url().endsWith(".jpeg") ||
      interceptedRequest.url().endsWith(".gif") ||
      interceptedRequest.url().endsWith(".css") ||
      interceptedRequest.url().endsWith(".woff") ||
      interceptedRequest.url().endsWith(".woff2") ||
      interceptedRequest.url().endsWith(".ttf") ||
      interceptedRequest.url().endsWith(".svg") ||
      interceptedRequest.url().endsWith(".ico")
    )
      interceptedRequest.abort();
    else interceptedRequest.continue();
  });

  await page.goto(
    "https://www.udemy.com/course/the-web-developer-bootcamp/?fbclid=IwAR1U9oVPPdseqA4OHkp7HDbLAQL-AHwM1P21sNsJ08CO4eb_qc0RyZd6glM"
  );

  // Set screen size

  await page.waitForSelector("button[data-testid='smart-bar-opt-in-cta']");

  const element = await page.$("button[data-testid='smart-bar-opt-in-cta']");

  element.click();

  await page.waitForNavigation();

  await page.waitForSelector(
    "div[data-purpose='price-text-container'] div[data-purpose='course-price-text'].ud-clp-discount-price .ud-sr-only + span"
  );

  const price = await page.$(
    "div[data-purpose='price-text-container'] div[data-purpose='course-price-text'].ud-clp-discount-price .ud-sr-only + span"
  );

  // const img  = await page.$eval("div[data-purpose='introduction-asset'] img", (el) => {
  //   return el
  // })

  // console.log(img)

  let value = await page.evaluate((el) => el.textContent, price);

  console.log(value);

  await browser.close();
};

  getPrice();
