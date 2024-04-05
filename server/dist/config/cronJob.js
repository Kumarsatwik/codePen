"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const cronJob = async () => {
    const serverUrl = process.env.SERVER_URL;
    node_cron_1.default.schedule("*/15 * * * *", async () => {
        try {
            await fetch(`${serverUrl}/test`);
            console.log("Server Check every 15 min");
        }
        catch (error) {
            console.error("Error while hitting API:", error);
        }
    });
};
exports.cronJob = cronJob;
