import { variables } from "../../../../config/envLoader";
import { ILogin, IUser } from "../../../../DB/interfaces/user";
import { forgetPasswordMail, verifyEmail } from "../../../../utils/emailTemplates";
import { createError } from "../../../../utils/errors/createError";
import { hashPassword, matchHash } from "../../../../utils/hashPwd";
import { signJwt } from "../../../../utils/jwtUtils";
import { sendEmail } from "../../../../utils/mailer";
import { decryptToken, generateToken } from "../../../../utils/resetPassword";
import MainAuthDatabase from "./database";
import express from 'express'
class MainAuthService{
    static async signup(data:IUser,next:express.NextFunction){
        const {email,name,password}=data

        const userExists=await MainAuthDatabase.isUserExists(email)
        
        if(userExists){
            return next(createError({status: 400,message:"User already exists"}))
        }
        const hashedPassword=await hashPassword(password as string)
        data.password=hashedPassword
        const result = await MainAuthDatabase.createUser(data)

        // const accessToken=signJwt({
        //     name:name,
        //     userId:result.userId,
        //     email:result.email
        // },"7d")
        const encryptedEmail=generateToken(email,"30d")
        const emailBody=verifyEmail(`${variables.BASE_URL}/api/v1/auth/verifyEmail?token=${encodeURIComponent(encryptedEmail)}`)
        await sendEmail(result.email,"Email Verification",emailBody,next)
        return {
            data:{userId:result.userId,name:result.name,email:result.email},
            // accessToken: accessToken
        }
    }

    static async login(data:ILogin,next:express.NextFunction){
        const {email,password}=data

        const user=await MainAuthDatabase.getUser(email)
        if(!user){
            return next(createError({status:404,message:"User not found"}))
        }

        if(! await matchHash(password,user.password)){
            return next(createError({status:401,message:"Invalid password"}))
        }

        if(!user.isVerified){
            return next(createError({status : 401,message:"user not verified"}))
        }

        const accessToken=signJwt({
            name:user.name,
            email:user.email,
            userId:user.userId
        },7)

        return {
            data :{userId:user.userId,email:user.email,name:user.name},
            accessToken:accessToken
        }
    }

    static async verifyEmail(token:string,next:express.NextFunction){
        const email=decryptToken(token)
        if(!email){
            return next(createError({status : 401,message:"token expired"}))
        }
        const userExists=await MainAuthDatabase.isUserExists(email)
        if(!userExists){
            return next(createError({status:404,message:"User not found"}))
        }
        const result=await MainAuthDatabase.verifyEmail(email)
        return result
    }

    static async forgetPassword(email:string,next:express.NextFunction){
        const userExists=await MainAuthDatabase.isUserExists(email)
        if(!userExists){
            return next(createError({status:404,message:"user not found"}))
        }

        const token=generateToken(email,"10m")
        const emailBody=forgetPasswordMail(token)
        console.log("Encrypted token : ",token);
        
        await sendEmail(email,"Reset Password Link",emailBody,next)
        return true
    }

    static async updatePassword(password:string,token:string,next:express.NextFunction){
        console.log(token,"token");
        
        const email=decryptToken(token as string)
        if(!email){
            return next(createError({status:400,message:"token invalid or expired"}))
        }
        const userExists=await MainAuthDatabase.isUserExists(email)
        if(!userExists){
            return next(createError({status:404,message:"User not found"}))
        }
        const hashedPassword=await hashPassword(password)
        const result=await MainAuthDatabase.updatePassword(email,hashedPassword)
        return result
    }
}

export default MainAuthService