import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";

export default class Pupperteer {
  _type;
  _domain;
  browser;
  page;

  constructor(type, domain) {
    this._type = type;
    this._domain = domain;
  }

  async initializePupperter() {
    puppeteer.use(StealthPlugin());
    puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();

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
    this.browser = browser;
    this.page = page;
    return this;
  }

  //Must be overrided
  async login() {}

  formatCookies(cookies) {
    return cookies.map((cookie) => {
      return { ...cookie, sameSite: cookie?.sameSite?.toLowerCase() };
    });
  }

  closeBrowser() {
    this.browser.close();
  }

  get try() {
    return new Proxy(this, {
      // Intercept method getter
      get(target, name) {
        if (typeof target[name] === "function") {
          return new Proxy(target[name], {
            // Intercept method call
            apply(target, self, args) {
              // console.log(target);
              console.log(self);
              try {
                return Promise.race([
                  new Promise((resolve, reject) => {
                    setTimeout(() => reject("Time out"), 2000);
                  }),
                  target.apply(self, args),
                ]);
              } catch (e) {
                console.log(e);

                if (!!this.browser) {
                  this.browser.close();
                }
                // swallow error
              }
            },
          });
        }
        return target[name];
      },
    });
  }
}
