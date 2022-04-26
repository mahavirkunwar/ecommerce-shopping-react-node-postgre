import express from "express";
import userController from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.post("/signin", userController.signIn);
usersRouter.post("/signup", userController.SignUp);
usersRouter.get("/:id?", userController.getUsers);

export default usersRouter;