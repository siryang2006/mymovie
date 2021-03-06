var ScrapyTianTangContent = require("./scrapytiantang.js").ScrapyTianTangContent;
var ScrapyTianTangUrls = require("./scrapytiantang.js").ScrapyTianTangUrls;

var Utils = require("./utils.js").Utils;

//https://www.dy2018.com/2/index_2.html
//https://www.dy2018.com/14/

class Scrapyer {
    constructor(name, scrapyerObject) {
        this.name = name;
        this.scrapyerObject = scrapyerObject;
    }

    getScrapyerObject() {
        return this.scrapyerObject;
    }
};

var movieList = new Array();
var worker = [ //配置
    new Scrapyer("tiantangang-juqing",
        new ScrapyTianTangUrls("https://www.dy2018.com/2/", 2, function () {
            startNext();
        }, movieList)),
    new Scrapyer("tiantangang-juqing-content",
        new ScrapyTianTangContent(function () {
            startNext();
        }, movieList))/*,
    new Scrapyer("tiantangang-xiju",
        new ScrapyTianTangUrls("https://www.dy2018.com/1/", function () {
            startNext();
        }))*/
];

function allFinished() {
    console.log("good , good, total finished .....");
    console.log("movieList:", movieList);
}

var i = 0;
function startNext() {
    if (worker.length == i) {
        allFinished();
        return;
    }

    var obj = worker[i].getScrapyerObject();
    i++;
    obj.start();
}

function main() {
    //var scrapyTianTangUrls = new ScrapyTianTangUrls();
    //scrapyTianTangUrls.start();

    //console.log(worker.urlScrapyer);

    startNext();

    /*for (var i=0; i<worker.length; i++) {
        var obj = worker[i];
        var scrapyUrls = new obj.urlScrapyerClassName();
        scrapyUrls.start();
    }*/

    //var scrapyTianTangContent = new ScrapyTianTangContent();
    //scrapyTianTangContent.start();
}

main();