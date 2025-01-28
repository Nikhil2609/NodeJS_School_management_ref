import { Response } from "express";
import { ApiResponse } from "./Interface/commonInterface";

export const sendResponse = (response: Response, statusCode: number = 200, data: any = null, message: string, errorMessage?: string) => {
    let responseJson: ApiResponse = {} as ApiResponse;
    if (data) {
        responseJson = {
            ...responseJson,
            data: data,
            message: message || "",
        }
    } else {
        responseJson = {
            ...responseJson,
            errorMessage: errorMessage || ""
        }
    }

    return response.status(statusCode).json(responseJson);
}