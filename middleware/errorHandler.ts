import express from "express";
import "express-async-errors";
import AnotherError from "../utils/errors/anotherError";
import NotFoundError from "../utils/errors/404notFound";
import { Error } from "mongoose";
import CustomError from "../utils/errors/customError";

export const ErrorHandler = (
  error: Error,
  _request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) => {
  console.error(1, error);
  if (error instanceof AnotherError) {
    return response.status(400).json({
      status: false,
      error: {
        code: error.codePhrase,
        message: error.message,
      },
    });
  } else if (error instanceof NotFoundError) {
    return response.status(404).json({
      status: false,
      error: {
        code: error.codePhrase,
        message: error.message,
      },
    });
  } else {
    return response.status(500).json({
      status: false,
      error: {
        code: error.name,
        message: error.message,
      },
    });
  }
};
