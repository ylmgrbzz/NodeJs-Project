import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: process.env.DB_CHARSET,
    namedPlaceholders: true,
    waitForConnections: true,
    connectionLimit: 100,
})

// db.connect((err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Database connected')
//     }
// }
// )

export default pool