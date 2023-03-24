import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import resultInterface from "./result/topSellerResultInterface.js";
import fs from "fs";

let result = resultInterface;

/** YEAR/MONTH/DATE */
const getDate = () => {
  let today = new Date();
  result.date = `${today.getFullYear()}/${
    today.getMonth() + 1
  }/${today.getDate()}`;
};

async function crawlingTopSeller(driver) {
  try {
    console.log("start top sellers crawling process...");
    await driver.get(
      "https://store.steampowered.com/search/?filter=topsellers&os=win"
    );
    await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[1]/div[7]/div[6]/form/div[1]/div/div[1]/div[3]/div/div[3]/a[1]/div[2]/div[1]/span" // 1st title
        )
      )
    );
    for (let i = 1; i < 11; i++) {
      // 1위~10위
      const xpath = `/html/body/div[1]/div[7]/div[6]/form/div[1]/div/div[1]/div[3]/div/div[3]/a[${i}]`;
      const title = `/div[2]/div[1]/span`;
      const linkElement = await driver.findElement(By.xpath(xpath));
      const link = await linkElement.getAttribute("href");
      const a = await driver.findElement(By.xpath(xpath + title));
      result.topSeller[i].title = await a.getText();
      result.topSeller[i].link = link;
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finish top sellers crawling process...");
    driver.quit();
  }
}

async function main() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        .headless()
        .addArguments("--disable-gpu", "window-size=1920x1080", "lang=ko_KR")
    ) // process in background
    .build();
  let userAgent = await driver.executeScript("return navigator.userAgent;");
  console.log("[UserAgent]", userAgent);
  getDate();
  crawlingTopSeller(driver);
}

main();
