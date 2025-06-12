const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

// Define the path to your chromedriver binary
const chromedriverPath = path.resolve(__dirname, '../../drivers/chromedriver-mac-arm64/chromedriver');

const service = new chrome.ServiceBuilder(chromedriverPath);
const options = new chrome.Options();
options.addArguments("--nosandbox", "--disable-dev-shm-usage");

// Build driver with custom service
const driver = new Builder()
  .forBrowser('chrome')
  .setChromeService(service)
  .setChromeOptions(options)
  .build();

async function runTest() {
  try {
    await driver.get('https://google.com');
    await driver.wait(until.titleIs("Google"), 5000)
    const title = await driver.getTitle();
    console.log('Page title is:', title);
    const testPassed = title === "Google";
    console.log("\nTest Passed: ", testPassed);
    return testPassed;
  } catch (err) {
    console.error('Error:', err);
    return false;
  } finally {
    await driver.quit();
  }
}

runTest();
