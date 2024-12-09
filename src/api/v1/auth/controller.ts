import express from 'express'
import MainAuthService from './service'
import StatusCodes from '../../../../config/constants/statusCodes'
class MainAuthController{

    static async signup(request:express.Request,response:express.Response,next:express.NextFunction){
        const data=request.body
        const result=await MainAuthService.signup(data,next)
        if(result){

        
        const payload={
            content:result,
            status:true
        }
        return response.status(StatusCodes.CREATED).json(payload)
      }
    }

    static async login(request:express.Request,response:express.Response,next:express.NextFunction){
        const data=request.body
        const result=await MainAuthService.login(data,next)
        if(result){
            const payload={
                content:result,
                status:true
            }
            return response.status(StatusCodes.OK).json(payload)
        }
    }

    static async verifyEmail(request:express.Request,response:express.Response,next:express.NextFunction){
        const {token}=request.query

        const result=await MainAuthService.verifyEmail(token as string,next)
        if(result){
            const payload={
                content:result,
                status:true
            }
            return response.status(StatusCodes.OK).json(payload)
        }
    }

    static async forgetPassword(request:express.Request,response:express.Response,next:express.NextFunction){
        const {email}=request.body
        const result=await MainAuthService.forgetPassword(email,next)
        if(result){
            const payload={
                content:result,
                status:true
            }
            return response.status(StatusCodes.OK).json(payload)
        }
        
    }

    static async updatePassword(request:express.Request,response:express.Response,next:express.NextFunction){
        const {password}=request.body
        const {token}=request.query
        const result=await MainAuthService.updatePassword(password,token as string,next)
        if(result){
            const payload={
                content:result,
                status:true
            }
            return response.status(StatusCodes.OK).json(payload)
        }
    }
}

export default MainAuthController