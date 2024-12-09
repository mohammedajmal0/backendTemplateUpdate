import jwt from 'jsonwebtoken'
import { variables } from '../config/envLoader'
export function generateToken(email: string,expiresIn:string) {
  const token = jwt.sign({ email }, variables.JWT_SECRET, { expiresIn: expiresIn })
  const encryptedToken = Buffer.from(token).toString('base64')
  return encryptedToken
}

export function decryptToken(encryptedToken: string) {
  const token = Buffer.from(encryptedToken, 'base64').toString('utf-8')
  try {
    const decoded = jwt.verify(token, variables.JWT_SECRET) as { email: string }
    return decoded.email
  } catch (error) {
    return null 
  }
}