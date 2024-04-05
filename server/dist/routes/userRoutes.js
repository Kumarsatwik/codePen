"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/userAuthController");
const verifyToken_1 = require("../middleware/verifyToken");
const UserAuthRouter = express_1.default.Router();
UserAuthRouter.post("/signup", userAuthController_1.signup);
UserAuthRouter.post("/login", userAuthController_1.login);
UserAuthRouter.post("/logout", userAuthController_1.logout);
UserAuthRouter.get("/user-details", verifyToken_1.verifyToken, userAuthController_1.userDetails);
UserAuthRouter.get("/my-codes", verifyToken_1.verifyToken, userAuthController_1.getMyCodes);
exports.default = UserAuthRouter;
