import express from "express";
import AnotherError from "../utils/errors/anotherError";
import { IAuthData } from "./authHandler";
import { createError } from "../utils/errors/createError";

declare global {
  namespace Express {
    interface Request {
      authData?: IAuthData;
    }
  }
}

class UserTypeHandler {
  static async checkAdmin(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    if (!request.authData?.isAuth) {
      return next(createError({status:401,message:"need signin"}))
    }
    if (request.authData.userType !== "pri_admin") {
      throw new AnotherError("NOT_ALLOWED_ACCESS", "Admin Only");
    }
    return next();
  }

  static async checkSecAdmin(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    if (!request.authData?.isAuth) {
      return next(createError({status:401,message:"need signin"}))
    }

    if (!["pri_admin", "sec_admin"].includes(request.authData.userType)) {
      throw new AnotherError("NOT_ALLOWED_ACCESS", "Admins Only");
    }
    return next();
  }

  static async checkReviewer(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    if (!request.authData?.isAuth) {
      return next(createError({status:401,message:"need signin"}))
    }

    if (
      !["pri_admin", "sec_admin", "reviewer"].includes(
        request.authData.userType
      )
    ) {
      throw new AnotherError("NOT_ALLOWED_ACCESS", "Reviewers and Admins Only");
    }

    return next();
  }
}

export default UserTypeHandler;
