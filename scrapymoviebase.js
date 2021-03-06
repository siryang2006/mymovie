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

        callback(null, currentMovie.contentUrl, currentMovie);
        
        //this.sql.getNextUrlToParse(callback);
    }

    onDecode(text) {//解码
        return text;
    }

	onParseToMovie(body, obj, movieObject){ //解析数据到电影对象
		return movieObject;
	}

    onParse(body, url, movieObject) {//解析内容
        body = this.onDecode(body);
        var $ = cheerio.load(body, {ignoreWhitespace:true});
		this.onParseToMovie(body, $, movieObject);

		this.sql.insert(movieObject);

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
