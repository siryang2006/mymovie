var mysql = require("mysql");
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

    /*this.name = name;
        this.time = time;
        this.contentUrl = contentUrl;
        this.score = score;

        this.url = "";
        this.image = "";
        this.describe = "";
        this.time = "";
        this.ratio = "";
        this.type = "";

        this.actor = "";
        this.releaseTime = "";
        this.region = "";*/

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

    insert(url) {
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