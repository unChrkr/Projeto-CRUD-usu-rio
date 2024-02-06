import { z } from "zod";
import {
  userCreateSchema,
  userSchema,
  userUpdateSchema,
} from "../schema/user.schema";

export type TUser = z.infer<typeof userSchema>;

export type TUserCreate = z.infer<typeof userCreateSchema>;

export type TUserUpdate = {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
};
