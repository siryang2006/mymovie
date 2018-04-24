var ScrapyTianTang = require("./scrapytiantang.js").ScrapyTianTang;

main();

function main() {
    var scrapyTianTang = new ScrapyTianTang();//天堂往
    scrapyTianTang.start();
}