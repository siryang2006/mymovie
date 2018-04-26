var ScrapyMovieBase = require("./ScrapyMovieBase.js");
var cheerio = require('cheerio');

class ScrapyTianTangContent extends ScrapyMovieBase.ScrapyContent {  //解析电影详细内容
    constructor() {  
        super(); //  调用父类的 constructor()
    }

    onGetNexUrl() { //获取要爬取的地址
        return "https://www.jianshu.com/p/03c5fa0390c8";
    }

    onGetMovieUrl(obj) {//电影链接
        console.log(obj("body > nav > div > a.btn.sign-up").text());
        return obj('.bri').attr("name");
    }

    onGetMovieImage(obj) {//电影图片
        return obj('.bri').attr("name");
    }

    onGetMovieName(obj) {//电影名字
        return obj('.bri').attr("name");
    }

    onGetMovieDescribe(obj) {//电影描述
        return obj('.bri').attr("name");
    }

    onError(error, statusCode) {//出错
        
    }
};

class ScrapyTianTangUrls extends ScrapyMovieBase.ScrapyUrls { //解析电影链接
    constructor() {  
        super(); //  调用父类的 constructor()
    }

    onGetNexUrl() { //获取要爬取的地址
        return "https://www.baidu.com/";
    }

    onGetContentUrlList(doc) {//电影详情页地址列表
        return doc.find("#tj_trhao123").attr("href");
    }

    onError(error, statusCode) {//出错
        console.log(error, statusCode);
    }
};

module.exports = { ScrapyTianTangContent, ScrapyTianTangUrls };