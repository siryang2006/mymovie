var ScrapyBase = require("./scrapybase.js");
var MovieContentMysqlDB = require("./mysqldb.js").MovieMysqlDB;
var MovieUrlMysqlDB = require("./mysqldb.js").MovieUrlMysqlDB;
var cheerio = require('cheerio');

var config = require("./config.js");

class ScrapyContent extends ScrapyBase {  //解析电影详细内容
    constructor() {
        super(); //  调用父类的 constructor()
        this.sql = new MovieContentMysqlDB(config.host, config.user, config.password, config.database, config.port);
    }

    onGetNexUrl(callback) { //获取要爬取的地址
        this.sql.getNextUrlToParse(callback);
    }

    onGetMovieUrl(obj) {//电影链接
        return "";
    }

    onGetMovieImage(obj) {//电影图片
        return "";
    }

    onGetMovieName(obj) {//电影名字
        return "";
    }

    onGetMovieDescribe(obj) {//电影描述
        return "";
    }

    onGetMovieTime(obj) {
        return "";
    }

    onGetMovieRatio(obj) {
        return "";
    }

    onParse(body, url) {//解析内容
        //console.log(body);
        var $ = cheerio.load(body,{
            ignoreWhitespace:true/*,
        xmlMode:true*/});
        console.log("-----" + $('input.s_btn').attr('class'));
        var movieName = this.onGetMovieName($);
        var movieUrl = this.onGetMovieUrl($);
        var movieImage = this.onGetMovieImage($);
        var movieDescripe = this.onGetMovieDescribe($);
        var movieTime = this.onGetMovieTime($);
        var movieRatio = this.onGetMovieRatio($);

        console.log(movieName, movieUrl, movieImage, movieDescripe);

        console.log("=================-",url);

        this.sql.insert(movieName, movieImage, movieDescripe, movieUrl,  movieTime, movieRatio, url)
    }

    onError(error, statusCode, url) {//出错
        super.onError(error, statusCode, url);
    }
};

class ScrapyUrls extends ScrapyBase { //解析电影链接
    constructor() {
        super(); //  调用父类的 constructor()
        this.mysql = new MovieUrlMysqlDB(config.host, config.user, config.password, config.database, config.port);
    }

    onGetNexUrl(callback) { //获取要爬取的地址
        callback(null, "");
    }

    onGetContentUrlList(obj) {//电影详情页地址列表
        return (new Array());
    }

    onParse(body, url) {//解析
        //console.log(body);
        var $ = cheerio.load(body, {
            ignoreWhitespace:true/*,
        xmlMode:true*/});//解析链接入库

        var content = this.onGetContentUrlList($);
        for(var i=0; i<content.length; i++) {
            var link = content[i];
            this.mysql.insert(link); 
        }
    }

    onError(error, statusCode, url) {//出错
        super.onError(error, statusCode, url);
    }
};

module.exports = { ScrapyContent, ScrapyUrls };