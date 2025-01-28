import e, { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";
import { sendResponse } from "../Utility/Responsehelper";

export const requestLogger = (request: Request, resposne: Response, next: NextFunction) => {
  console.log("API URL =>", request.url, 
              " Body =>", request.body, 
              " Parameter =>", request.params)
  next()
}

export const errorHandler = (error: any, request: Request, resposne: Response, next: NextFunction) => {
  console.log("API Error Handling =>", 
              error.message, 
              error.stack);
  console.error(error);

  const statusCode = 500; // Default to 500 if no status code is set
  const errorMessage = error.message || "Internal Server Error"; // Default to a generic error message

  sendResponse(resposne, statusCode, null, "", errorMessage);
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

    const errorMessage = details?.details[0]?.message
    sendResponse(res, 400, null, "", errorMessage);
  } else {
    next(err); // Pass other errors to the default error handler
  }
};