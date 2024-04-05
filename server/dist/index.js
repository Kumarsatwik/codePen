"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConnection_1 = require("./config/dbConnection");
const cronJob_1 = require("./config/cronJob");
const compilerRoutes_1 = __importDefault(require("./routes/compilerRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
(0, cronJob_1.cronJob)();
const app = (0, express_1.default)();
const clientUrl = process.env.CLIENT_URL;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: clientUrl }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
(0, dbConnection_1.dbConnect)();
app.use("/auth", userRoutes_1.default);
app.use("/compiler", compilerRoutes_1.default);
app.get("/test", (req, res) => {
    return res.sendStatus(200);
});
app.listen(process.env.PORT || 4000, () => console.log(`server started on port ${process.env.PORT}`));
