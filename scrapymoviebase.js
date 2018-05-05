var ScrapyBase = require("./scrapybase.js");
var MovieContentMysqlDB = require("./mysqldb.js").MovieMysqlDB;
var MovieUrlMysqlDB = require("./mysqldb.js").MovieUrlMysqlDB;
var cheerio = require('cheerio');

var config = require("./config.js").config;
var Movie = require("./movie.js").Movie;

class ScrapyContent extends ScrapyBase {  //解析电影详细内容
    constructor(finishedCallBack, movieList) {
        super(finishedCallBack, movieList); //  调用父类的 constructor()
        this.currentIndex = 0;
        
        this.sql = new MovieContentMysqlDB(config.host, config.user, config.password, config.database, config.port);
    }

    onGetNexUrl(callback) { //获取要爬取的地址
        if (this.currentIndex >= this.movieList.length) {//没有要爬取的数据了
            this.finishedCallBack(this.movieList);
            this.currentMovie = null;
            return;
        }

        var currentMovie = this.movieList[this.currentIndex];
        this.currentIndex = this.currentIndex  + 1;

        callback(null, currentMovie.getContentUrl(), currentMovie);
        
        //this.sql.getNextUrlToParse(callback);
    }

    onGetActor(obj, body) { //主演
        return "";
    }

    onGetReleaseTime(obj, body) {//上映时间
        return "";
    }

    onGetRegion(obj, body) {//地区
        return "";
    }

    onGetDirector(obj, body) {//导演
        return ""; 
    }

    onGetScore(obj, body) {
        return "";
    }

    onGetMovieUrl(obj, body) {//电影链接
        return "";
    }

    onGetMovieImage(obj, body) {//电影图片
        return "";
    }

    onGetMovieName(obj, body) {//电影名字
        return "";
    }

    onGetMovieDescribe(obj, body) {//电影描述
        return "";
    }

    onGetMovieTime(obj, body) {
        return "";
    }

    onGetMovieRatio(obj, body) {
        return "";
    }

    onGetMovieType(obj, body) {
        return -1;
    }

    onDecode(text) {//解码
        return text;
    }

    onParse(body, url, movieObject) {//解析内容
        body = this.onDecode(body);
        var $ = cheerio.load(body, {ignoreWhitespace:true});
        movieObject.name = this.onGetMovieName($, body);
        movieObject.url = this.onGetMovieUrl($, body);
        movieObject.image = this.onGetMovieImage($, body);
        movieObject.describe = this.onGetMovieDescribe($, body);
        movieObject.time = this.onGetMovieTime($, body);
        movieObject.ratio = this.onGetMovieRatio($, body);
        movieObject.type = this.onGetMovieType($, body);
        movieObject.releaseTime = this.onGetReleaseTime($, body);
        movieObject.region = this.onGetRegion($, body);
        movieObject.actor = this.onGetActor($, body);
        movieObject.director = this.onGetDirector($, body);
        movieObject.score = this.onGetScore($, body);

        console.log(movieObject);
    }

    onError(err, statusCode, url) {//出错
        super.onError(err, statusCode, url);
    }
};

class ScrapyUrls extends ScrapyBase { //解析电影链接
    constructor(finishedCallBack, movieList) {
        super(finishedCallBack, movieList); //  调用父类的 constructor()
        this.mysql = new MovieUrlMysqlDB(config.host, config.user, config.password, config.database, config.port);
    }

    onGetNexUrl(callback) { //获取要爬取的地址
        callback(null, ""/*url*/, null);
    }

    onGetContentUrlList(obj) {//电影详情页地址列表
        return (new Array());
    }

    onDecode(text) {//解码
        return text;
    }

    onParse(body, url, obj) {//解析
        body = this.onDecode(body);
        var $ = cheerio.load(body, {ignoreWhitespace:true});//解析链接入库
        this.movieList = this.movieList.concat(this.onGetContentUrlList($));
    }

    onError(error, statusCode, url) {//出错
        super.onError(error, statusCode, url);
    }
};

module.exports = { ScrapyContent, ScrapyUrls };
