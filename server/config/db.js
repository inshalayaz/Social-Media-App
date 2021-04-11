const sql = require('mysql')


const db = sql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'inshal14',
    database : 'SocialMedia'

})

module.exports = db