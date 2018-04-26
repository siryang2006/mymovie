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
                callback(err, null, null);
            } else {
                conn.query(sql, function (err, results, fields) {
                    callback(err, results, fields);  //事件驱动回调  
                    conn.release(); //释放连接  
                });
            }
        });
    };
};

//create database movie;
//use movie;
//create table  movies(name varchar(1024), image varchar(1024), `describe` longtext, address varchar(4096), date datetime, ratio varchar(20), updateTime datetime, url varchar(1024) primary key not null);
class MovieMysqlDB extends mysqlDB {
    constructor(host, user, password, database, port) {
        super(host, user, password, database, port);
    }

    insert(name, image, describe, address, time, ratio, url) {
        var sql = 'update movies set name="' + name + '", image="' + image + '", `describe`="'+describe+'", address="'+address
        +'", date="'+time+'", ratio="'+ratio+'", updateTime=now() where url="' + url + '"';

        console.log(sql);

        super.query(sql, function (err, results, fields) {
            console.log(err, results, fields);
        });
    }

    getNextUrlToParse(callBack) {
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
            console.log(err, results, fields);
        });
    }

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
            console.log(err, results, fields);
        });
    }

    update() {

    }

    select() {

    }
};

module.exports = { MovieMysqlDB, MovieUrlMysqlDB };