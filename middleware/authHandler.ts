import express from 'express'
import AnotherError from '../utils/errors/anotherError'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { variables } from '../config/envLoader'
import { userTypeList } from '../config/constants/userTypes'

export interface IAuthData {
  isAuth: boolean
  username: string
  userType: (typeof userTypeList)[number]
  userId: string
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
      throw new AnotherError('NEED_SIGNIN', 'Login')
    }
    const token = request.headers.authorization.split(' ')[1]
    if (!token) {
      throw new AnotherError('NEED_SIGNIN', 'Login')
    }
    const jwtSecret: Secret = variables.JWT_SECRET

    let decodedToken: IDecodedJWT
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (!err) {
        decodedToken = decoded as IDecodedJWT
        authData = {
          isAuth: true,
          username: decodedToken.username,
          userType: decodedToken.userType,
          userId: decodedToken.userId,
        }
      } else {
        throw new AnotherError('NEED_SIGNIN', 'Login')
      }
      request.authData = authData
    })

    return next()
  }
}

export default AuthHandler
