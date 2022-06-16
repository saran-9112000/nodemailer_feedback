const userService = require('../services/user.service');
const tokenAccess = require('../validators/jwt/validate.token')


exports.signup = async(req,res, next) => {
    console.log(req.payload)
    const user = await userService.signup(req.payload)
    console.log(user)
    return res.response(user).code(200)
}

exports.login = async(req,res,next) => {
    //console.log(req.payload)
    const user = await userService.login(req.payload)
    console.log(user)
    return res.response(user).code(200)
}

exports.userFeedBack = async(req,res,next) => {
    //console.log(req.payload)
    const token = await tokenAccess.check(req.headers["x-access-token"]) 
    console.log(token)
    const user = await userService.userFeedBack(req.payload,token)
    console.log(user)
    return res.response(user).code(200)
}

