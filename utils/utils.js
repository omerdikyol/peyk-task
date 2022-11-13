const jwt = require('jsonwebtoken')

// In recipes, we store user id. To reach user name, we need to decode bearer token.
const decodeUser = async (req) => {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.decode(token)
    return user
}

module.exports = { decodeUser }