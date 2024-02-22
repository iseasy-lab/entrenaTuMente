require('dotenv').config({path:'./.env'});
const IP_ADDRESS = process.env.REACT_APP_BACKEND_URL
const USER = process.env.REACT_APP_BACKEND_USER
const PASSWORD = process.env.REACT_APP_BACKEND_PSWD
const DATABASE = process.env.REACT_APP_BACKEND_DB_NAME

const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 100,
    host: '3.134.64.181',
    user: USER,
    password: PASSWORD,
    database: DATABASE
})

module.exports = db;
