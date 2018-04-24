var http = require('http');
var request = require('request');

class ScrapyBase {
    constructor() {
        this.stop = false;//类中变量
    }

    //需要在子类实现继承
    onGetNexUrl() { //获取要爬取的地址
        return "";
    }

    start() {//开始爬取
        this.stop = false;
        this.startNext();
    }

    startNext() {
        var url = this.onGetNexUrl();
        if (url.length == 0) {
            console.log("no url to scrapy...");
            return;
        }
        this.requestUrl(url);
    }

    stop() {//停止爬取
        this.stop = true;
    }

    onParse(body) {//解析
        console.log(body);
    }

    onError(error, statusCode) {//出错
        console.log(error, statusCode);
    }

    requestUrl(url) {//网络请求
        var self = this;
        request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            self.onParse(body);
        } else {
            self.onError(error, response ? response.statusCode : 0);
        }

        if (this.stop == true) {
            //self.startNext();//继续下一个爬取
        }
        });
    }
};

module.exports = ScrapyBase;