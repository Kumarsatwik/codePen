import express from "express";
import {
  getMyCodes,
  login,
  logout,
  signup,
  userDetails,
} from "../controllers/userAuthController";
import { verifyToken } from "../middleware/verifyToken";
const UserAuthRouter = express.Router();

UserAuthRouter.post("/signup", signup);
UserAuthRouter.post("/login", login);
UserAuthRouter.post("/logout", logout);
UserAuthRouter.get("/user-details", verifyToken, userDetails);
UserAuthRouter.get("/my-codes", verifyToken, getMyCodes);

export default UserAuthRouter;
