import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnect } from "./config/dbConnection";
import { compilerRouter } from "./routes/compilerRoutes";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

dbConnect();

app.use("/compiler", compilerRouter);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("ok");
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
