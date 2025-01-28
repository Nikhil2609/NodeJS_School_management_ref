import { Request, Response } from "express";
import { sendResponse } from "../Utility/Responsehelper";
import { HTTP_STATUS_CODE } from "../Utility/Enum";
import { generateToken } from "../Middleware/authMiddleware";

export default class LoginController {
    constructor() {
    }

    login = async (req: Request, res: Response) => {
        const payload = req.body;

        // generate token 
        const token = generateToken(payload);
        console.log("token=>", token);

        return sendResponse(res, HTTP_STATUS_CODE.OK, token, "Token generated successfully");
    }
}