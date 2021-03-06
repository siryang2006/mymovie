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

	detailSplitSign(){
		return new Array("◎", "◆");
	}

    getContentByTag(src, tagTextList) {
		var tagTextArray = tagTextList.split("|");
		var splitSign = this.detailSplitSign();
        var arr;
		for(var m = 0; m<splitSign.length; m++) {
			arr = src.split(splitSign[m]);
			if (arr.length>1) {
				break;
			}
		}
        for (var i=0; i<arr.length; i++) {
            var text = Utils.trimAll(arr[i]);
			for(var j=0; j<tagTextArray.length; j++) {
				var tagText = tagTextArray[j];
				if (text.indexOf(tagText) == 0) {
					
					return text.replace(tagText, "");
				}
			}
        }

        return "";
    }

	onParseToMovie(body, obj, movieObject){ //解析数据到电影对象
		var tags = this.getActorTag()+"|"
		+ this.getDirectorTag()+"|"
		+ this.getReleaseTimeTag()+"|"
		+ this.getRegionTag()+"|"
		+ this.getUrlTag()+"|"
		+ this.getNameTag()+"|"
		+ this.getEnglishNameTag() + "|"
		+ this.getDescribeTag()+"|"
		+ this.getTimeTag()+"|"
		+ this.getRatioTag()+"|"
		+ this.getTypeTextTag()+"|"
		+ this.getLanguageTag() +"|"
		+ this.getCaptionTag() +"|"
		+ this.getIMDBScoreTag() + "|"
		+ this.getFileSizeTag()+"|"
		+ this.getTimeLengthTag()+"|"
		+ this.getIMDBLinkTag()+"|"
		+ this.getFileTypeTag()+"|"
		+ this.getTestTag() + "|"
		+ this.getCompanyTag() + "|"
		+ this.getOtherTag();

		var ret = Utils.split(Utils.trimAll(obj("div#Zoom").text()), tags);

		movieObject.name = Utils.getDataByTagFromArray(ret, this.getNameTag(), true);
		if(movieObject.name == "") {
			movieObject.name = obj("div.title_all > h1").text();
		}
        movieObject.url = Utils.splitData(Utils.getDataByTagFromArray(ret, this.getUrlTag(), false), "ftp:", "rmvb");
        movieObject.image = this.getImage(obj, body);
		movieObject.company = Utils.getDataByTagFromArray(ret, this.getCompanyTag(), true);
        movieObject.describe = Utils.getDataByTagFromArray(ret, this.getDescribeTag(), true);
        movieObject.ratio = Utils.getDataByTagFromArray(ret, this.getRatioTag(), true);
        movieObject.typeText = Utils.getDataByTagFromArray(ret, this.getTypeTextTag(), true);
        movieObject.releaseTime = Utils.getDataByTagFromArray(ret, this.getReleaseTimeTag(), true);
        movieObject.region = Utils.getDataByTagFromArray(ret, this.getRegionTag(), true);
        movieObject.actor = Utils.getDataByTagFromArray(ret, this.getActorTag(), true);
        movieObject.director = Utils.getDataByTagFromArray(ret, this.getDirectorTag(), true);
        movieObject.score = this.getScore(obj, body);
		movieObject.time = Utils.getDataByTagFromArray(ret, this.getTimeTag(), true);
		movieObject.describeImage = this.getDescribeImage(obj, body);
		movieObject.descriptionHtml = obj("div#Zoom span p:nth-child(2)").html();

		return movieObject;
	}

	getDescriptionHtml(obj, body) {
		return obj("div#Zoom").html();
	}

	getCompanyTag() {
		return "出品";
	}

	getActorTag() {
		return "主演|主要演员|演员";
	}

	getTestTag() {
		return "测试";
	}

	getIMDBScoreTag() {
		return "IMDB评分";
	}

	getFileTypeTag() {
		return "文件格式";
	}

	getIMDBLinkTag() {
		return "IMDB链接"
	}

	getTimeLengthTag() {
		return "片长|时长";
	}

	getFileSizeTag() {
		return "文件大小";
	}

	getCaptionTag() {
		return "字幕";
	}

	getLanguageTag() {
		return "语言";
	}

	getDirectorTag() {
		return "导演";
	}

	getReleaseTimeTag() {
		return "上映日期|上映";
	}

	getRegionTag() {
		return "地区|国家";
	}

	getUrlTag() {
		return "ftp:";
	}

    getNameTag() {//电影名字
        return "中文名|译名|片名";
    }

	getEnglishNameTag() {
		return "片名|英文片名"; 
	}

    getDescribeTag() {//电影描述
        return "简介|剧情简介|影片简介|剧情：";
    }

    getTimeTag() {
        return "年代";
    }

	getOtherTag() {
		return "分级|链接";
	}

    getRatioTag() {
        return "视频尺寸";
    }

    getTypeTextTag() {//类型
        return "类别|类型";
    }

    getScore(obj, body) {
        return obj("strong.rank").text();
    }

	getDescribeImage(obj, body) {//描述图片地址
		return obj("div#Zoom span img").attr("src");
	}

	getImage(obj, body) {//电影图片
        return obj("div#Zoom p img").attr("src");
    }

    /*

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
*/

    onDecode(text) {//解码
        return iconv.decode(text, 'gb2312');
    }

    onError(error, statusCode, url) {//出错
        super.onError(error, statusCode, url);
    }
};

class ScrapyTianTangUrls extends ScrapyMovieBase.ScrapyUrls { //解析电影链接
    constructor(url, type, finishedCallBack, movieList) {
        super(finishedCallBack, movieList); //  调用父类的 constructor()
        this.pageIndex = 110;
        this.movieUrl = url;
		this.type = type;

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
                var movie = new Movie(name, time, mvUrl, score, self.type);

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