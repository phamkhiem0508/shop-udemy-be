import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const browser = await puppeteer.launch({
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--no-first-run",
    "--no-zygote",
    "--single-process",
    "--disable-gpu",
    "javascript:close()",
  ],
});

const getPrice = async (pageNumber) => {
  const page =  await browser.newPage();

  try {
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

    await page.click("button[data-testid='smart-bar-opt-in-cta']");

    await page.waitForNavigation();

    await page.waitForSelector(
      "div[data-purpose='price-text-container'] div[data-purpose='course-price-text'].ud-clp-discount-price + div[data-purpose='original-price-container']"
    );

    const price = await page.$(
      "div[data-purpose='price-text-container'] div[data-purpose='course-price-text'].ud-clp-discount-price > .ud-sr-only + span"
    );

    // const img  = await page.$eval("div[data-purpose='introduction-asset'] img", (el) => {
    //   return el
    // })

    // console.log(img)

    let value = await page.evaluate((el) => el.textContent, price);

    console.log(value);

    await page.close();
  } catch (e) {
    await page.close();
  }
};

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    getPrice(i);
  }, 1000 * i);
}


