const mysql = require('mysql2')

const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: 'Ph6727&88',
  connectionLimit: 5
})

connectionPool.getConnection((err, connection) => {
  // connection or not
  if (err) {
    console.log('get connection fail', err)
    return
  }

  // try to connect
  connection.connect((err) => {
    if (err) {
      console.log('connect to database fail', err)
    } else {
      console.log('connect to database success')
    }
  })
})

const connection = connectionPool.promise()

module.exports = connection
