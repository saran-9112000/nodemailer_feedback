const Login = require("../models/user.model");
const Feedback = require("../models/feedback.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../mailService/mail.service')
const { userSchema } = require('../validators/user.validator');
const fs = require("fs")

exports.signup = async(payload) => {
    console.log(payload)
    try{
        const result = await userSchema.validateAsync(payload)
        console.log(result)
        try{
            const validate = await Login.query().findOne({email:payload.email})
            if(!validate){
                const name = payload.userName
                const email = payload.email
                const role = payload.Role
                const hash_password = await bcrypt.hash(payload.userPassword, 10);
                console.log(hash_password)
                const user = await Login.query().insert({userName:name,email:email,Role:role,userPassword:hash_password});
                console.log(user)
                return user
            }
            else return "User Already in use"
            }
            catch (err) {
                console.log(err)
               throw err  
            }  
        }
        catch (err) {
            console.log(err)
            
           return err,"validation error"
        }
}

exports.login = async(payload) => {
    try{
    const user = await Login.query().findOne({email:payload.email})
    console.log(user)
        try{
             const compare =await bcrypt.compare(payload.userPassword,user.userPassword)
             console.log(compare)
             if(compare) return jwt.sign(JSON.stringify(user),'RESTFULAPIs')
             else return false
        }
        catch(err){
            return err
        }
    }
    catch(err){
        return err
    }
}

exports.userFeedBack = async(payload, decoded) => {
    try{
        console.log(decoded.Role)
    if(decoded.Role == 'user') {
    
        //const result = await feedbackSchema.validateAsync(payload)
       // console.log(result)
        console.log("checking service payload details",payload)
        const name = payload.file.hapi.filename;
        const path = __dirname + "/uploads/" + name;
        console.log(path)
        const file = fs.createWriteStream(path);

        file.on('error', (err) => console.error(err));

        payload.file.pipe(file);

        payload.file.on('end', (err) => { 
            const ret = {
                filename: payload.file.hapi.filename,
                headers: payload.file.hapi.headers
            }
            console.log("READING DATA",JSON.stringify(ret));
        })
        
        const mail = await sendMail(payload, path);
        console.log(mail)
     
        const user = await Feedback.query().insert({
                        userId: decoded.userId,
                        email: payload.user,
                        customerFeedback: payload.customerFeedback,
                        screenshot: path
                })
                return user       
           
    }   
    return 'You dont have access to do the operation'     

    }
    catch (err){
        return err
    }   
}