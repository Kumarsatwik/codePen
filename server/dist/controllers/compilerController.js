"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCode = exports.saveCode = void 0;
const code_model_1 = require("../models/code.model");
const saveCode = async (req, res) => {
    const { fullCode } = req.body;
    try {
        const newCode = await code_model_1.codeModel.create({
            fullCode,
        });
        return res.status(201).send({ url: newCode._id, status: "Saved" });
    }
    catch (error) {
        return res.status(500).send({ message: "Error saving code ", error });
    }
};
exports.saveCode = saveCode;
const loadCode = async (req, res) => {
    const { urlId } = req.body;
    try {
        const code = await code_model_1.codeModel.findById(urlId);
        if (!code) {
            return res.status(404).send({ message: "Code not found" });
        }
        return res.status(200).send({ fullCode: code.fullCode });
    }
    catch (error) {
        return res.status(500).send({ message: "Error loading code ", error });
    }
};
exports.loadCode = loadCode;
