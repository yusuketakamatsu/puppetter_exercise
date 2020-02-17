const puppeteer = require('puppeteer');
const fs = require('fs');

const getPage = async (browser, target, domain) => {
  let protocol = "https://";
  let page = await browser.newPage();
  const response = await page.goto(protocol + domain + target.path);
  // await page.screenshot({
  //     path: `puppeteer/img/${target.name}.png`,
  //     fullpage: true
  // });
  console.log(target.name + " url: " + protocol + domain + target.path);
  console.log(target.name + " status_code: " + response._status);
  console.log(target.name + " end.");
  await page.close();
}

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  info = JSON.parse(fs.readFileSync(`puppeteer/${process.argv[2]}.json`));
  domain = info.domain;
  await Promise.all(
    info.targets.map(target => getPage(browser, target, domain))
  );
  browser.close();
})()