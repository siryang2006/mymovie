var ScrapyTianTangContent = require("./scrapytiantang.js").ScrapyTianTangContent;
var ScrapyTianTangUrls = require("./scrapytiantang.js").ScrapyTianTangUrls;

main();

function main() {
    //var scrapyTianTangUrls = new ScrapyTianTangUrls();
    //scrapyTianTangUrls.start();

    var scrapyTianTangContent = new ScrapyTianTangContent();
    scrapyTianTangContent.start();
}