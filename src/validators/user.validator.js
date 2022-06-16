const Joi = require('@hapi/joi')
const userSchema = Joi.object({
    userName:  Joi.string().min(5).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    Role: Joi.string().required(),
    userPassword: Joi.string().min(5).max(15).required()
})

module.exports={
    userSchema
}