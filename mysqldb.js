class mysqlDB{
    constructor(host, user, password, database, port){
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
      
    query(sql,options,callback) {  
        pool.getConnection(function(err,conn){  
            if(err) {  
                callback(err,null,null);  
            } else {  
                conn.query(sql,options,function(err,results,fields) {  
                    callback(err,results,fields);  //事件驱动回调  
                    conn.release(); //释放连接  
                });  
            }  
        });  
    };  
};

module.exports = {mysqlDB};