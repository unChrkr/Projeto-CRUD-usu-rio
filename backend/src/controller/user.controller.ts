import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserController {
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    const order = req.query.order as "asc" | "desc";

    const userService = new UserService();
    const users = await userService.getAllUsers(order);
    return res.json(users);
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const userService = new UserService();
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const userId = parseInt(req.params.id);

    const userService = new UserService();
    const user = await userService.updateUser(req.body, userId);

    return res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const userId = parseInt(req.params.id);

    const userService = new UserService();
    await userService.deleteUser(userId);

    return res.status(204).send();
  }
}
