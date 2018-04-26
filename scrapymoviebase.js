var ScrapyBase = require("./scrapybase.js");
var cheerio = require('cheerio');

class ScrapyContent extends ScrapyBase {  //解析电影详细内容
    constructor() {
        super(); //  调用父类的 constructor()
    }

    onGetNexUrl() { //获取要爬取的地址
        return "";
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

    onParse(body) {//解析内容
        //console.log(body);
        var $ = cheerio.load(body);
        console.log("-----" + $('input.s_btn').attr('class'));
        var movieName = this.onGetMovieName($);
        var movieUrl = this.onGetMovieUrl($);
        var movieImage = this.onGetMovieImage($);
        var movieDescripeName = this.onGetMovieDescribe($);

        console.log(movieName, movieUrl, movieImage, movieDescripeName);
    }

    onError(error, statusCode) {//出错
        console.log(error, statusCode);
    }
};

class ScrapyUrls extends ScrapyBase { //解析电影链接
    constructor() {
        super(); //  调用父类的 constructor()
    }

    onGetNexUrl() { //获取要爬取的地址
        return "";
    }

    onParse(body) {//解析
        //console.log(body);
        var $ = cheerio.load(body);//解析链接入库
        console.log("-----" + $('input.s_btn').attr('class'));

        var content = onGetContentUrlList($);
        $.each(function (content) {
            var url = $(this); 
            console.log("url:", url); 
            //var chapterTitle = chapter.find('strong').text(); //找到章节标题  
            //var videos = chapter.find('.video').children('li');  
        });
    }

    onGetContentUrlList(doc) {//电影详情页地址列表
        return "";
    }

    onError(error, statusCode) {//出错
        console.log(error, statusCode);
    }
};

module.exports = { ScrapyContent, ScrapyUrls };