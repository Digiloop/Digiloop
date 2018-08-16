const mysql = require('mysql2/promise');
const db = require('./db');
let pool = mysql.createPool(db);

let connection = async (query, values) => {
    try {
        let [rows, fields] = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.log(error)
    }
};

module.exports = connection;
