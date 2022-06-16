const loginRoute = require('../controllers/user.controller')

module.exports = [

{
    method: 'POST',
    path: '/api/auth/signup',
    handler: loginRoute.signup
},

{
    method: 'POST',
    path: '/api/auth/login',
    handler: loginRoute.login
},

{
    method: 'POST',
    path: '/user/feedback',
    handler:loginRoute.userFeedBack,
    options: {
        payload: {
            maxBytes: 209715200,
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data',
            multipart: { output: "stream" },
        }
    }
},

]