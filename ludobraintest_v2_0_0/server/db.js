const IP_ADDRESS = process.env.REACT_APP_BACKEND_URL
const USER = process.env.REACT_APP_BACKEND_USER
const PASSWORD = process.env.REACT_APP_BACKEND_PSWD
const DATABASE = process.env.REACT_APP_BACKEND_DB_NAME

const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 100,
    host: '3.134.64.181',
    user: 'root',
    password: 'Cr1stopherp3rez',
    database: 'bdd_ludotest'
})

module.exports = db;
