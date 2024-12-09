import express from 'express'
import MainAuthController from './controller'
const AuthRouter=express.Router()

AuthRouter.post("/signup",(request:express.Request,response:express.Response,next:express.NextFunction)=>{
    MainAuthController.signup(request,response,next)
})

AuthRouter.post("/login",(request:express.Request,response:express.Response,next:express.NextFunction)=>{
    MainAuthController.login(request,response,next)
})

AuthRouter.get("/verifyEmail",(request:express.Request,response:express.Response,next:express.NextFunction)=>{
    MainAuthController.verifyEmail(request,response,next)
})

AuthRouter.post("/forgetPassword",(request:express.Request,response:express.Response,next:express.NextFunction)=>{
    MainAuthController.forgetPassword(request,response,next)
})

AuthRouter.put("/updatePassword",(request:express.Request,response:express.Response,next:express.NextFunction)=>{
    MainAuthController.updatePassword(request,response,next)
})

export default AuthRouter