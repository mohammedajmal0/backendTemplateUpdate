import StatusCodes from "../../config/constants/statusCodes";
import CustomError, { IErrorCodes, IErrorReturn } from "./customError";

class NotFoundError extends CustomError {
  codePhrase: IErrorCodes = "NOT_FOUND";

  constructor() {
    super("Not Found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  statusCode: number = 404;
  returnError(): IErrorReturn {
    return {
      message: this.message,
      code: this.codePhrase,
      statusCode: this.statusCode,
    };
  }
}

export default NotFoundError;
