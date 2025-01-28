import express from "express";
import LoginController from "../Controller/loginController";

const loginRoute = express.Router();
const loginController: LoginController = new LoginController();

loginRoute.post("/", loginController.login);
export default loginRoute;