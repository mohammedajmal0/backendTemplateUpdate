import express from 'express'
import AnotherError from '../utils/errors/anotherError'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { variables } from '../config/envLoader'
import { userTypeList } from '../config/constants/userTypes'
import { createError } from '../utils/errors/createError'

export interface IAuthData {
  isAuth: boolean
  name: string
  userType: (typeof userTypeList)[number]
  userId: string
  email:string
}

export interface IDecodedJWT extends JwtPayload, IAuthData {}

declare global {
  namespace Express {
    interface Request {
      authData?: IAuthData
    }
  }
}

class AuthHandler {
  static async authMiddleware(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    let authData: IAuthData

    if (!request.headers.authorization) {
      return next(createError({status:401,message:"need signin"}))
    }
    const token = request.headers.authorization.split(' ')[1]
    if (!token) {
      return next(createError({status:401,message:"need signin"}))
    }
    const jwtSecret: Secret = variables.JWT_SECRET

    let decodedToken: IDecodedJWT
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (!err) {
        decodedToken = decoded as IDecodedJWT
        authData = {
          isAuth: true,
          name: decodedToken.name,
          userType: decodedToken.userType,
          userId: decodedToken.userId,
          email:decodedToken.email
        }
      } else {
        return next(createError({status:401,message:"need signin"}))
      }
      request.authData = authData
    })

    return next()
  }
}

export default AuthHandler
