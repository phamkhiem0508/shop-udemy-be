import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import fs from "fs";
import path, { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const getPrice = async (pageNumber) => {
  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--incognito"],
  });
  const page = await browser.newPage();

  try {
    await page.setRequestInterception(true);
    page.on("request", (interceptedRequest) => {
      if (interceptedRequest.isInterceptResolutionHandled()) return;
      if (
        interceptedRequest.url().endsWith(".png") ||
        interceptedRequest.url().endsWith(".jpg") ||
        interceptedRequest.url().endsWith(".jpeg") ||
        interceptedRequest.url().endsWith(".gif") ||
        // interceptedRequest.url().endsWith(".css") ||
        interceptedRequest.url().endsWith(".woff") ||
        interceptedRequest.url().endsWith(".woff2") ||
        interceptedRequest.url().endsWith(".ttf") ||
        interceptedRequest.url().endsWith(".svg") ||
        interceptedRequest.url().endsWith(".ico")
      )
        interceptedRequest.abort();
      else interceptedRequest.continue();
    });


    const cookie = fs.readFileSync(`${path.resolve() + "/scripts/cookies.json"}`, { encoding: "utf8", flag: "r" });

    await page.setCookie(...JSON.parse(cookie));

    await page.goto("https://wgualumni.udemy.com/");

    // await page.click("a[data-purpose='user-dropdown'");

    // await page.close();
  } catch (e) {
    console.log(e);
    await page.close();
  }
};

getPrice();
