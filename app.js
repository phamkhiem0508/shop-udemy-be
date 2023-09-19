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

  // await page.setUserAgent(
  //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
  // );
  // await page.setJavaScriptEnabled(true);

  // Navigate the page to a URL
  await page.goto("https://www.udemy.com/course/the-web-developer-bootcamp/?fbclid=IwAR1U9oVPPdseqA4OHkp7HDbLAQL-AHwM1P21sNsJ08CO4eb_qc0RyZd6glM");

  // await page.setViewport({ width: 1440, height: 1024 });


  // Set screen size

  await page.waitForSelector(".ud-text-with-links");

  const element = await page.$("span[data-purpose='smart-bar-subtitle']");

  let value = await page.evaluate(el => el.textContent, element)

  console.log(value)



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
