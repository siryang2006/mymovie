var ScrapyMovieBase = require("./ScrapyMovieBase.js");
var cheerio = require('cheerio');

class ScrapyTianTangContent extends ScrapyMovieBase.ScrapyContent {  //解析电影详细内容
    constructor() {  
        super(); //  调用父类的 constructor()
    }

    onGetNexUrl() { //获取要爬取的地址
        return "https://www.baidu.com/";
    }

    onGetMovieUrl(obj) {//电影链接
        console.log(obj(".lb").text());
        return obj('.bri').attr("name");
    }

    onGetMovieImage(obj) {//电影图片
        return obj("#tj_trhao123").attr("href");
    }

    onGetMovieName(obj) {//电影名字
        return obj("#tj_trhao123").attr("href");
    }

    onGetMovieDescribe(obj) {//电影描述
        return obj("#tj_trhao123").attr("href");
    }

    onError(error, statusCode) {//出错
        console.log(error, statusCode);
    }
};

class ScrapyTianTangUrls extends ScrapyMovieBase.ScrapyUrls { //解析电影链接
    constructor() {  
        super(); //  调用父类的 constructor()
    }

    onGetNexUrl() { //获取要爬取的地址
        return "https://www.baidu.com/";
    }

    onGetContentUrlList(obj) {//电影详情页地址列表
        return obj.find("#tj_trhao123").attr("href");
    }

    onError(error, statusCode) {//出错
        console.log(error, statusCode);
    }
};

module.exports = { ScrapyTianTangContent, ScrapyTianTangUrls };