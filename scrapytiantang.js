var ScrapyBase = require("./scrapybase.js");
var cheerio = require('cheerio');

class ScrapyTianTang extends ScrapyBase {  
    constructor() {  
        super(); //  调用父类的 constructor()
    }

    onGetNexUrl() { //获取要爬取的地址
        return "https://www.baidu.com/";
    }

    onParse(body) {//解析
        //console.log(body);
        var $ = cheerio.load(body);
        console.log("-----"+$('input.s_btn').attr('class'));
    }

    onError(error, statusCode) {//出错
        console.log(error, statusCode);
    }
};

module.exports = ScrapyTianTang;