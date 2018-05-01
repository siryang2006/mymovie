var ScrapyMovieBase = require("./ScrapyMovieBase.js");
var cheerio = require('cheerio');
var urlModel = require("url");
var Movie = require("./movie.js").Movie;
var iconv = require('iconv-lite');

class ScrapyTianTangContent extends ScrapyMovieBase.ScrapyContent {  //解析电影详细内容
    constructor(finishedCallBack, movieList) {
        super(finishedCallBack, movieList); //  调用父类的 constructor()
    }

    onGetNexUrl(callback) { //获取要爬取的地址
        super.onGetNexUrl(callback);
    }

    onGetActor(obj, body) { //主演

    }

    onGetRelaseTime(obj, body) {//上映时间

    }

    onGetRegion(obj, body) {//地区

    }

    onGetMovieUrl(obj, body) {//电影链接
        return obj("div.co_content8 ul div#Zoom span table").html();//.attr("thunderrestitle");
    }

    onGetMovieImage(obj, body) {//电影图片
        return obj("html body div#header div.contain div.bd2 div.bd3 div.co_area2 div.co_content8 ul div#Zoom p img").attr("src");
    }

    onGetMovieName(obj, body) {//电影名字
        return obj("div#Zoom p:nth-child(1)").text().split("◎")[0];
    }

    onGetMovieDescribe(obj, body) {//电影描述
        return obj("div#Zoom p:nth-child(1)").text().split("◎")[15];
    }

    onGetMovieTime(obj, body) {
        return obj("div#Zoom p:nth-child(1)").text().split("◎")[3];
    }

    onGetMovieRatio(obj, body) {
        return obj("div#Zoom p:nth-child(1)").text().split("◎")[11];
    }

    onGetMovieType(obj, body) {//类型
        return obj("div#Zoom p:nth-child(1)").text().split("◎")[5];
    }

    onDecode(text) {//解码
        return iconv.decode(text, 'gb2312');
    }

    onError(error, statusCode, url) {//出错
        super.onError(error, statusCode, url);
    }
};

class ScrapyTianTangUrls extends ScrapyMovieBase.ScrapyUrls { //解析电影链接
    constructor(url, finishedCallBack, movieList) {
        super(finishedCallBack, movieList); //  调用父类的 constructor()
        this.pageIndex = 186;
        this.movieUrl = url;

        var urlObject = urlModel.parse(this.movieUrl);
        this.webHost = urlObject.protocol + "//" + urlObject.host;

        console.log("start url:", this.movieUrl);
    }

    onGetNexUrl(callback) { //获取要爬取的地址
        var httpUrl = this.movieUrl;
        if (this.pageIndex != 1) {
            httpUrl = httpUrl + "index_" + this.pageIndex + ".html";
        }

        console.log("-----==", httpUrl);

        this.pageIndex++;
        callback(null, httpUrl, null);
        //super.onGetNexUrl(callback);
    }

    onDecode(text) {//解码
        return iconv.decode(text, 'gb2312');
    }

    onGetContentUrlList(obj) {//电影详情页地址列表
        var list = new Array();
        var self = this;
        obj("html body div#header div.contain div.bd2 div.bd3 div.bd3r div.co_area2 div.co_content8 ul table")
            .each(function (i, e) {
                var name = obj(e).find("tbody tr td b a.ulink:nth-child(2)").text();
                var time = obj(e).find("tbody tr td font:nth-child(1)").text();
                var score = obj(e).find("tbody tr td font:nth-child(2)").text();
                var mvUrl = self.webHost + obj(e).find("tbody tr td b a.ulink:nth-child(2)").attr("href");
                var movie = new Movie(name, time, mvUrl, score);

                list.push(movie);

                self.movieList.push(movie);
            });
        return list;
    }

    onError(error, statusCode, url) {//出错
        var self = this;
        if (statusCode == 404) {
            self.stop = true;
            self.finishedCallBack(self.movieList);
        } else {
            super.onError(error, statusCode, url);
        }
    }
};

module.exports = { ScrapyTianTangContent, ScrapyTianTangUrls };