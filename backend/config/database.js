const mysql = require ('mysql'),
      mysqlConnection = require('express-myconnection'),
      dbOptions = {
        host: 'localhost',
        user:'root',
        password: '',
        port:'3306',
        database:'inmobana'
    
    }

let database = mysqlConnection(mysql,dbOptions,'request')

module.exports = database