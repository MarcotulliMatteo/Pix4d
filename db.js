const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: 'pix4d',
    password: 'password',
    posrt: 5432
});

module.exports = pool;