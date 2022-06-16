const jwt = require('jsonwebtoken');

exports.check = async (token) => {
    console.log("checking token ", token)
    if(!token) return 'Enter a token'
    const decoded = jwt.decode(token)
    const Role = decoded.Role
    console.log(Role)
    console.log(token)
    return decoded
}