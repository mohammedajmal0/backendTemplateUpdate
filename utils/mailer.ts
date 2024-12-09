import nodemailer from 'nodemailer'
import { variables } from '../config/envLoader'
import AnotherError from './errors/anotherError'
import express from 'express'
import { createError } from './errors/createError'

export const sendEmail = async (reciever: string, subject: string, body: string,next:express.NextFunction) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: variables.WORKSPACE_EMAIL, // Your full Google Workspace email address
      pass: variables.WORKSPACE_PASSWORD, // Google Workspace password
    },
    tls: {
      rejectUnauthorized: false, // Bypass SSL certificate validation
    },
  })
  const hasHTMLTags = /<[a-z][\s\S]*>/i.test(body)
  const mailOptions = {
    from: variables.WORKSPACE_EMAIL, // Use your Google Workspace email
    to: reciever, // The email address to send to
    subject: subject,
    text: body,
    ...(hasHTMLTags ? { html: body } : {}),
  }
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return next(createError({status:400,message:"Error sending mail"}))
  }
}