import e, { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";
import { sendErrorResponse } from "../Utility/Responsehelper";

export const requestLogger = (request: Request, resposne: Response, next: NextFunction) => {
  console.log("API URL =>", request.url,
    " Method =>", request.method,
    " Body =>", request.body,
    " Parameter =>", request.params)
  next()
}

export const errorHandler = (error: any, request: Request, resposne: Response, next: NextFunction) => {
  console.log("<<<=== Global Error Message ===>>>");
  console.log("Message =>", error.message);
  console.log("Error Stack =>", error.stack);
  console.error(error);

  const statusCode = 500; // Default to 500 if no status code is set
  const errorMessage = error.message || "Internal Server Error"; // Default to a generic error message

  sendErrorResponse(resposne, statusCode, errorMessage);
  next()
}

export const celebrateErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get("body"); // For body validation errors
    const errorParams = err.details.get("params"); // For params validation errors
    const errorQuery = err.details.get("query"); // For query validation errors

    const details = errorBody || errorParams || errorQuery;

    const errorMessage = details?.details[0]?.message || "";
    sendErrorResponse(res, 400, errorMessage);
  } else {
    next(err); // Pass other errors to the default error handler
  }
};