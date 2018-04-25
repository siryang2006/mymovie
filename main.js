var ScrapyTianTangContent = require("./scrapytiantang.js").ScrapyTianTangContent;

main();

function main() {
    var scrapyTianTangContent = new ScrapyTianTangContent();//天堂往
    scrapyTianTangContent.start();
}