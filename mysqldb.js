var mysql = require("mysql");
var Utils = require("./utils.js").Utils;

class mysqlDB {
    constructor(host, user, password, database, port) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.port = port;

        this.init();
    }

    init() {
        if (this.pool == null) {
            this.pool = mysql.createPool({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database,
                port: this.port
            });
        }
    }

    query(sql, callback) {
        this.pool.getConnection(function (err, conn) {
            if (err) {
                console.log("mysql error1:", err);
                callback(err, null, null);
            } else {
                conn.query(sql, function (err, results, fields) {
                    if (err) {
                        console.log("mysql error:", err);
                    }

                    callback(err, results, fields);  //事件驱动回调  
                    conn.release(); //释放连接  
                });
            }
        });
    };
};

//create database movie;
//use movie;
//create table  movies(name varchar(1024), image varchar(1024), `describe` longtext, address varchar(4096), type tinyint, date datetime, ratio varchar(20), updateTime datetime, url varchar(1024) primary key not null);
class MovieMysqlDB extends mysqlDB {
    constructor(host, user, password, database, port) {
        super(host, user, password, database, port);
    }

	genDownloadHtml(urlArray) {
		var ret = "";
		for(var i=0; i<urlArray.length; i++) {
			var index = urlArray[i].lastIndexOf("]");
			if (index == -1) {
				index = urlArray[i].lastIndexOf("/");
			}

			if (index != -1) {
				ret = ret + urlArray[i].substring(index+1, urlArray[i].length-1) + "$$$$"+urlArray[i]+"\n";
			}
		}
		return ret;
	}

	dealData(src) {
		return Utils.replaceAll(src, "\"", "\\\"");
	}

		insert(movieObj) {
        //var sql = 'insert ignore into movies(url) values("' + url + '");';
		/*var sql = 'insert into dede_archives(typeid, title, writer, litpic, pubdate, senddate, keywords, scores, description) value('
		+ movieObj.type + ',"'
		+ movieObj.name + '","'
		+ movieObj.time + '","'
		//+movieObj.describeImage + '","'
		+ movieObj.image+'",now(),now(),"'
		+ movieObj.describe.substr(0, 30) + '",'
		+ parseFloat(movieObj.score)*10 + ',"'
		+ movieObj.describe + '")';*/

		/*aid	mediumint	8

	smallint	5
	mediumtext	0
redirecturl	varchar	255
templet	varchar	30

userip	char	15

	mediumtext	0
	varchar	60
	mediumtext	0
*/

var sql = 'insert dede_addonmovie(typeid, body, authors, areas, murls) value('
	+ movieObj.type + ',"'
	+ this.dealData(movieObj.descriptionHtml) + '","'
	+ movieObj.actor + '","'
	+ movieObj.region + '","'
	+ this.genDownloadHtml(movieObj.url)+'")';

        console.log(sql);

        super.query(sql, function (err, results, fields) {
            //console.log(err, results, fields);
        });
    }

    update(movieObject) {
        var sql = 'update movies set name="' + movieObject.name 
        + '", image="' + movieObject.image 
        + '", `describe`="'+ movieObject.describe 
        + ',type="' + movieObject.type+'", address="'
        + movieObject.address +'", date="' + movieObject.time 
        + '", ratio="' + movieObject.ratio 
        + '", updateTime=now() where url="' + movieObject.url + '"';

        console.log(sql);

        super.query(sql, function (err, results, fields) {
            //console.log(err, results, fields);
        });
    }

    /*getNextUrlToParse(callBack) {
        var sql = "select url from movies where name is null or HOUR(timediff(now(),updateTime))>24 limit 1";
        super.query(sql, function (err, results, fields) {
            if (err) {
                callBack(err, "");
            } else {
                if (results.length >= 1) {
                    callBack(null, results[0].url);
                } else {
                    callBack(null, "");
                }
            }
            //console.log(err, results, fields);
        });
    }*/

    update() {

    }

    select() {

    }
};

class MovieUrlMysqlDB extends mysqlDB {
    constructor(host, user, password, database, port) {
        super(host, user, password, database, port);
    }

/*
id	mediumint	8
typeid	smallint	5
typeid2	varchar	90
sortrank	int	10
flag	set	0
ismake	smallint	6
channel	smallint	6
arcrank	smallint	6
click	mediumint	8
money	smallint	6
title	char	60
shorttitle	char	36
color	char	7
writer	char	20
source	char	30
litpic	char	100
pubdate	int	10
senddate	int	10
mid	mediumint	8
keywords	char	30
lastpost	int	10
scores	mediumint	8
goodpost	mediumint	8
badpost	mediumint	8
voteid	mediumint	8
notpost	tinyint	1
description	varchar	255
filename	varchar	40
dutyadmin	mediumint	8
tackid	int	10
mtype	mediumint	8
weight	int	10
*/

/*
	varchar	40
dutyadmin	mediumint	8
tackid	int	10
	mediumint	8
weight	int	10
*/
    insert(movieObj) {
        var sql = 'insert ignore into movies(url) values("' + url + '");';

        console.log(sql);

        super.query(sql, function (err, results, fields) {
            //console.log(err, results, fields);
        });
    }

    update() {

    }

    select() {

    }
};

module.exports = { MovieMysqlDB, MovieUrlMysqlDB };