var ScrapyTianTangContent = require("./scrapytiantang.js").ScrapyTianTangContent;
var ScrapyTianTangUrls = require("./scrapytiantang.js").ScrapyTianTangUrls;

main();

function main() {
    var scrapyTianTangUrls = new ScrapyTianTangUrls();//天堂往
    scrapyTianTangUrls.start();

    /*var scrapyTianTangContent = new ScrapyTianTangContent();//天堂往
    scrapyTianTangContent.start();*/
}