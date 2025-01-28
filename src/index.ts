import 'express-async-errors'; // handle async error no need try-catch in every controller files for unexpected error it will handle by global error
import express from "express";
import { errors } from "celebrate";
import router from "./Router/router";
import { celebrateErrorHandler, errorHandler, requestLogger } from "./Middleware/middleware";

const app = express();
import dotenv from 'dotenv';
dotenv.config();


app.use(requestLogger); // logger middleware (application leval)
app.use(express.json()); // middleware : pass request body into json format

// routing middleware
app.use("/api", router);

// Celebrate Error Handler (user inputs validations)
// app.use(errors());  // default error handler function with default response structure
app.use(celebrateErrorHandler); // custom user input error handler function with custom response structure

// global error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server running on port ${port}`))