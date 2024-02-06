import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";
import { AppError } from "../errors";

export const verifyEmailAlreadyRegisteredMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userEmail = request.body.email;
  const user = await userRepository.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (user) {
    throw new AppError("Email already registered", 409);
  }
  return next();
};

export default verifyEmailAlreadyRegisteredMiddleware;
