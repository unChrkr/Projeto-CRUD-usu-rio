import { Prisma } from "@prisma/client";
import { TUser, TUserCreate } from "../interface/user.interface";
import { userRepository } from "../repositories/user.repository";

export class UserService {
  async getAllUsers(orderBy: "asc" | "desc" = "asc"): Promise<TUser[]> {
    const users = await userRepository.findMany({
      orderBy: {
        updatedAt: orderBy,
      },
    });
    return users;
  }

  async createUser(userData: TUserCreate): Promise<TUser> {
    const user = await userRepository.create({ data: userData });
    return user;
  }

  async updateUser(
    userData: Prisma.UserUpdateInput,
    id: number
  ): Promise<TUser> {
    const user = await userRepository.update({
      where: { id },
      data: userData,
    });

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    await userRepository.delete({
      where: { id },
    });
  }
}
