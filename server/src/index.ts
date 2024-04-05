import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { dbConnect } from "./config/dbConnection";
import { cronJob } from "./config/cronJob";

import compilerRouter from "./routes/compilerRoutes";
import UserAuthRouter from "./routes/userRoutes";

dotenv.config();
cronJob();

const app = express();
const clientUrl = process.env.CLIENT_URL;

app.use(express.json());
app.use(cors({ credentials: true, origin: clientUrl }));
app.use(morgan("dev"));
app.use(cookieParser());

dbConnect();

app.use("/auth", UserAuthRouter);
app.use("/compiler", compilerRouter);

app.get("/test", (req: Request, res: Response) => {
  return res.sendStatus(200);
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
