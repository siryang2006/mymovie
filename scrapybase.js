var http = require('http');
var request = require('request');

var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

class ScrapyBase {
    constructor(finishedCallBack, paramList) {
        this.stop = false;//类中变量
        this.finishedCallBack = finishedCallBack;
        this.movieList = paramList;
    }

    onDecode(text) {//解码
        return text;
    }

    //需要在子类实现继承
    onGetNexUrl(callback) { //获取要爬取的地址
        callback(null, "", null);
    }

    start() {//开始爬取
        this.stop = false;
        this.startNext();
    }

    startNext() {
        var self = this;
        this.onGetNexUrl(function (err, url, obj) {
            console.log("------------", url);
            if (url.length == 0) {
                console.log("no url to scrapy...");
                self.stop = true;
                self.finishedCallBack(self.paramList);
            } else {
                self.requestUrl(url, obj);
            }
        });
    }

    stop() {//停止爬取
        this.stop = true;
    }

    onParse(body, url, obj) {//解析
        //console.log(body);
    }

    onError(error, statusCode, url) {//出错
        console.log(error, statusCode);
    }

    onGetHeaderEncode() {
        return null;
    }

    requestUrl(url, obj) {//网络请求
        var self = this;
        var options = {
            url: url,
            encoding: self.onGetHeaderEncode(),
            headers: headers
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                self.onParse(body, url, obj);
            } else {
                self.onError(error, response ? response.statusCode : 0, url);
            }

            if (self.stop == false) {
                setTimeout(function () {
                    self.startNext();
                }, 5000);
            }
        });
    }
};

module.exports = ScrapyBase;