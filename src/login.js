const puppeteer = require('puppeteer');
const fs = require('fs');

const login = async (browser, loginInfo) => {
  let protocol = "https://";
  let page = await browser.newPage();
  await page.goto(protocol + loginInfo.domain + loginInfo.path);

  await page.type('input[name="user[email]"]', loginInfo.user.email);
  await page.type('input[name="user[password]"]', loginInfo.user.pass);
  page.click('input[type="submit"]');

  await page.waitForNavigation();
  await page.screenshot({
    path: `puppeteer/img/login.png`,
    fullpage: true
  });

  await browser.close();
};

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  loginInfo = JSON.parse(fs.readFileSync(`puppeteer/login.json`));
  await login(browser, loginInfo);
  browser.close();
})()
