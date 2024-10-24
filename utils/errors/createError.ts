interface ErrorOptions {
    status?: number;
    message?: string;
  }
  
  export class CustomError extends Error {
    public status: number;
    constructor({ status = 500, message = 'Internal Server Error' }: ErrorOptions) {
      super(message);
      this.status = status;
      // Set the prototype explicitly to ensure instanceof works correctly
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  
  export const createError = (options: ErrorOptions): CustomError => {
    return new CustomError(options);
  };
  