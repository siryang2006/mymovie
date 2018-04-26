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
        return "http://url";
    }

    onGetMovieImage(obj) {//电影图片
        return "image url";
    }

    onGetMovieName(obj) {//电影名字
        return "name";
    }

    onGetMovieDescribe(obj) {//电影描述
        return "good job";
    }

    onGetMovieTime(obj) {
        return "2018-04-04 00:00:00";
    }

    onGetMovieRatio(obj) {
        return "1024*1024";
    }

    onError(error, statusCode) {//出错
        super.onError(error, statusCode);
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
        var list = new Array();
        list.push("url");
        /*obj("#tj_trhao123").each(function(i, e) {
            console.log($(e).attr("href"));
            list.push($(e).attr("href"));
        });*/
        return list;
    }

    onError(error, statusCode) {//出错
        super.onError(error, statusCode);
    }
};

module.exports = { ScrapyTianTangContent, ScrapyTianTangUrls };