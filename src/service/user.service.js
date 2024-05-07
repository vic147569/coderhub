const connection = require('../app/database')

class UserService {
  async create(user) {
    // get user
    const { name, password } = user
    // statement
    const statement = 'INSERT INTO `users` (name, password) VALUES (?, ?);'
    // connection execute
    const result = await connection.execute(statement, [name, password])
    return result
  }

  async findUserByName(name) {
    const statement = 'SELECT * FROM `users` WHERE name = ?;'
    const [values] = await connection.execute(statement, [name])
    return values
  }

  async updateUserAvatar(avatar_url, userId) {
    const statement = 'UPDATE users SET avatar_url = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [avatar_url, userId])
    return result
  }
}

module.exports = new UserService()
