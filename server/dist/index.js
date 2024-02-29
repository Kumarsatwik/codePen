"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const dbConnection_1 = require("./config/dbConnection");
const compilerRoutes_1 = require("./routes/compilerRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
(0, dbConnection_1.dbConnect)();
app.use("/compiler", compilerRoutes_1.compilerRouter);
app.get("/", (req, res) => {
    return res.status(200).send("ok");
});
app.listen(process.env.PORT || 4000, () => console.log(`server started on port ${process.env.PORT}`));
