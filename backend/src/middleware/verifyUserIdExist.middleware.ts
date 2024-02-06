import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";
import { AppError } from "../errors";

export const verifyUserIdExistMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = Number(request.params.id);
  const user = await userRepository.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User doesn't exist", 404);
  }
  return next();
};
