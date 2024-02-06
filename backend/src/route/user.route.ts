import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { verifyUserIdExistMiddleware } from "../middleware/verifyUserIdExist.middleware";
import verifyEmailAlreadyRegisteredMiddleware from "../middleware/verifyEmailAlreadyExist.middleware";

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.get("/users", userController.getAllUsers);

usersRoutes.post(
  "/users",
  verifyEmailAlreadyRegisteredMiddleware,
  userController.createUser
);

usersRoutes.patch(
  "/users/:id",
  verifyUserIdExistMiddleware,
  userController.updateUser
);

usersRoutes.delete(
  "/users/:id",
  verifyUserIdExistMiddleware,
  userController.deleteUser
);

export default usersRoutes;
