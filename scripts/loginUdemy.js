import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import fs from "fs";

const getPrice = async (pageNumber) => {
  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
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

    await page.goto("https://wgualumni.udemy.com/");

    await page.waitForSelector("a[data-purpose='sso-button']");

    await page.click("a[data-purpose='sso-button']");

    await page.waitForSelector("input#login-username");

    await page.$eval("input#login-username", (el) => {
      console.log("found");
      el.value = "scooter1";
    });

    await page.$eval("input#login-password", (el) => {
      el.value = "BuckLM90";
    });

    await page.click("button#signOnButton");

    await new Promise((resolve) => setTimeout(resolve, 10000));

    // await page.click("a[data-purpose='user-dropdown'");

    const cookies = await page.cookies();

    if(cookies.filter((cookie) => cookie.name === "access_token").length === 0){
      throw new Error("Login Udemy failed");
    }

    fs.writeFileSync("./cookies.json", JSON.stringify(cookies.map((cookie) => {
      return { ...cookie, sameSite: cookie?.sameSite?.toLowerCase() };
    })));

    // await page.close();
  } catch (e) {
    console.log(e);
    await page.close();
  }
};

getPrice();
