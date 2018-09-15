const mariadb = require('mariadb');

const pool = mariadb.createPool({host: 'db', user:process.env.MARIADB_USER, password:process.env.MARIADB_PASSWORD, database:'pigu', connectionLimit: 50});

module.exports = pool;
