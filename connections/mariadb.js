const mariadb = require('mariadb');

const pool = mariadb.createPool({host: 'db', user:process.env.MARIADB_USER, password:process.env.MARIADB_PASSWORD, database:'pigu', connectionLimit: 50});
//const pool = mariadb.createPool({host: 'db.pigu.leongwenqing.com', user:process.env.MARIADB_USER, password:process.env.MARIADB_PASSWORD, database:'pigu', connectionLimit: 50});

module.exports = pool;
