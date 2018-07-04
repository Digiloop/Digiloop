var connection = async function main(query, values) {
    const mysql = require('mysql2/promise');
    const db = await require('./db')
    const connection = await mysql.createConnection(db)
    let [rows, fields] = await connection.execute(query, values);
    return rows;
};

module.exports = connection;