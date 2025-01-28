import express from "express";
const studentRouter = express.Router();

studentRouter.get("/", (req,res) => {
    res.json({data: "valid student"})
})
export default studentRouter;