import "express-async-errors";
import express, { Application, json } from "express";
import usersRoutes from "./route/user.route";
import { handleErrors } from "./errors";
import cors from "cors";

const app: Application = express();

app.use(cors());

app.use(json());
app.use("/", usersRoutes);
app.use(handleErrors);

export default app;
