import CustomError, { IErrorCodes, IErrorReturn } from "./customError";

class AnotherError extends CustomError {
  codePhrase: IErrorCodes;
  constructor(codePhrase: IErrorCodes, message: string) {
    super(message);
    this.codePhrase = codePhrase;
    Object.setPrototypeOf(this, AnotherError.prototype);
  }
  statusCode: number = 400;
  returnError(): IErrorReturn {
    return {
      message: this.message,
      code: this.codePhrase,
      statusCode: this.statusCode,
    };
  }
}

export default AnotherError;
