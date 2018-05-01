function sleep(ms) {//同步睡眠
    return new Promise(resolve => setTimeout(resolve, ms))
}

const { Builder, By, Key, until } = require('selenium-webdriver');
let driver = new Builder().forBrowser('firefox').build();
(async function example() {
    try {
        await driver.get('https://mfclub.com');
        //await driver.get('https://www.baidu.com');
        //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        //await driver.wait(until.titleIs('百度一下，你就知道'), 1000);
    } catch (err) {
        console.log("error:", err.name, err.message);
        if ('SessionNotCreatedError' == err.name) {
            await driver.quit();
            //driver = await new Builder().forBrowser('firefox').build();
        } else {
            await sleep(3000);
            await example();
        }
    } finally {
    }
})();

process.on('unhandledRejection', (reason, promise) => {//异常捕获
    console.log('error !!! Unhandled Rejection at:', reason.stack || reason);
});