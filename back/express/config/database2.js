const mysql = require('mysql2/promise');
const db = require('./db');

var connection = async (query, values) => {
    try {
        let pool = await mysql.createPool(db);
        let [rows, fields] = await pool.query(query,values);
        pool.end();
        return rows;
    } catch (error) {
        console.log(error)
        pool.end();
    }
};

module.exports = connection;