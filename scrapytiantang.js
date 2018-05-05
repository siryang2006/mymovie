var ScrapyMovieBase = require("./ScrapyMovieBase.js");
var cheerio = require('cheerio');
var urlModel = require("url");
var Movie = require("./movie.js").Movie;
var iconv = require('iconv-lite');
var Utils = require("./utils.js").Utils;

class ScrapyTianTangContent extends ScrapyMovieBase.ScrapyContent {  //解析电影详细内容
    constructor(finishedCallBack, movieList) {
        super(finishedCallBack, movieList); //  调用父类的 constructor()
    }

    onGetNexUrl(callback) { //获取要爬取的地址
        super.onGetNexUrl(callback);
    }

    removeTage(src, tagText) { //去掉标签
        src = Utils.trimAll(src);
        if (src.indexOf(tagText)  != 0 ) {
            console.log("warning: remove tag failed", src, tagText);
            return "";
        }
        
        return src.replace(tagText, "");
    }

    getContentByTag(src, tagText) {
        var arr = src.split("◎");
        for (var i=0; i<arr.length; i++) {
            var text = Utils.trimAll(arr[i]);
            if (text.indexOf(tagText) == 0) {
                return text.replace(tagText, "");
            }
        }

        console.log("[warning]get tag failed ", tagText);
        return "";
    }

    onGetActor(obj, body) { //主演
        return this.getContentByTag(obj("div#Zoom p:nth-child(1)").text(), "主演");
    }

    onGetDirector(obj, body) {
        return this.getContentByTag(obj("div#Zoom p:nth-child(1)").text(), "导演"); 
    }

    onGetReleaseTime(obj, body) {//上映时间
        return this.getContentByTag(obj("div#Zoom p:nth-child(1)").text(), "上映日期");
    }

    onGetRegion(obj, body) {//地区
        return this.getContentByTag(obj("div#Zoom p:nth-child(1)").text(), "地区");
    }

    //html body div#header div.contain div.bd2 div.bd3 div.co_area2 div.co_content8 ul div#Zoom span p a
    onGetMovieUrl(obj, body) {//电影链接
        var url = obj("html body div#header div.contain div.bd2 div.bd3 div.co_area2 div.co_content8 ul div#Zoom span p:nth-child(2)").text(); 
        var startIndex = url.indexOf("ftp:");
        if (startIndex == -1) {
            console.log("error: get movie download url failed!!!");
            return "";
        }

        var text = ".rmvb";
        var endIndex = url.indexOf(text);
        if (endIndex == -1) {
            console.log("error: get movie download url failed!!!", url);
            return "";
        }

        return url.substr(startIndex, endIndex);
    }

    onGetMovieImage(obj, body) {//电影图片
        return obj("html body div#header div.contain div.bd2 div.bd3 div.co_area2 div.co_content8 ul div#Zoom p img").attr("src");
    }

    onGetMovieName(obj, body) {//电影名字
        return this.getContentByTag(obj("div#Zoom p:nth-child(1)").text(), "中文名");
    }

    onGetMovieDescribe(obj, body) {//电影描述
        return this.getContentByTag(obj("div#Zoom p:nth-child(1)").text(), "简介");
    }

    onGetMovieTime(obj, body) {
        return this.getContentByTag(obj("div#Zoom p:nth-child(1)").text(), "年代");
    }

    onGetMovieRatio(obj, body) {
        return this.getContentByTag(obj("div#Zoom p:nth-child(1)").text(), "视频尺寸");
    }

    onGetMovieType(obj, body) {//类型
        return this.getContentByTag(obj("div#Zoom p:nth-child(1)").text(), "类别");
    }

    onGetScore(obj, body) {
        return obj("html body div#header div.contain div.bd2 div.bd3 div.co_area2 div.co_content8 ul div.position span strong.rank").text();
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