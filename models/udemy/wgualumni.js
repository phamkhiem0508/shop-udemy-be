import Pupperteer from "./pupperteer.js";
import fs from "fs";

export default class Wgualumni extends Pupperteer{
    constructor(type,domain){
        super(type,domain);
    }

    async login(username,password){
        await this.try.initializePupperter();

        await this.page.goto(this._domain);

        await this.page.waitForSelector("a[data-purpose='sso-button']");
    
        await this.page.click("a[data-purpose='sso-button']");
    
        await this.page.waitForSelector("input#login-username");
    
        await this.page.$eval("input#login-username", (el,username) => {
          el.value = username;
        },username);
    
        await this.page.$eval("input#login-password", (el,password) => {
          el.value = password;
        },password);
    
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'domcontentloaded',}),
            this.page.click("button#signOnButton")
        ]);

        await new Promise((resolve) => setTimeout(resolve, 5000));
    
        const cookies = await this.page.cookies(this._domain);

        const formatedCookies = await this.formatCookies(cookies);

        // fs.writeFileSync(
        //   "./cookies.json",
        //   JSON.stringify(formatedCookies)
        // );

        await this.closeBrowser();

        return formatedCookies;
    }
}