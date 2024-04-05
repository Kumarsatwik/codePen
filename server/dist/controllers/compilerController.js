"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCodes = exports.editCode = exports.deleteCode = exports.loadCode = exports.saveCode = void 0;
const code_model_1 = require("../models/code.model");
const user_model_1 = require("../models/user.model");
const saveCode = async (req, res) => {
    const { fullCode, title } = req.body;
    let ownerName = "Anonymous";
    let ownerInfo = undefined;
    let isAuthenticated = false;
    let user = undefined;
    if (req._id) {
        user = await user_model_1.User.findById(req._id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        ownerName = user?.username;
        ownerInfo = user._id;
        isAuthenticated = true;
    }
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
        return res.status(400).send({ message: "Code cannot be blank" });
    }
    try {
        const newCode = await code_model_1.codeModel.create({
            fullCode: fullCode,
            ownerName: ownerName,
            ownerInfo: ownerInfo,
            title: title,
        });
        if (isAuthenticated && user) {
            user?.savedCodes?.push(newCode._id);
            await user.save();
        }
        return res.status(201).send({ url: newCode._id, status: "Saved" });
    }
    catch (error) {
        return res.status(500).send({ message: "Error saving code ", error });
    }
};
exports.saveCode = saveCode;
const loadCode = async (req, res) => {
    const { urlId } = req.body;
    let isOwner = false;
    const userId = req._id;
    try {
        const code = await code_model_1.codeModel.findById(urlId);
        if (!code) {
            return res.status(404).send({ message: "Code not found" });
        }
        const user = await user_model_1.User.findById(userId);
        if (user?.username === code.ownerName) {
            isOwner = true;
        }
        return res.status(200).send({ fullCode: code.fullCode, isOwner });
    }
    catch (error) {
        return res.status(500).send({ message: "Error loading code ", error });
    }
};
exports.loadCode = loadCode;
const deleteCode = async (req, res) => {
    const userId = req._id;
    try {
        const owner = await user_model_1.User.findById(userId);
        const { id } = req.params;
        if (!owner) {
            return res.status(404).send({ message: "Cannot find user" });
        }
        const exisitingCode = await code_model_1.codeModel.findById(id);
        if (!exisitingCode) {
            return res.status(404).send({ message: "Code not found" });
        }
        if (exisitingCode.ownerInfo != owner.username) {
            return res
                .status(400)
                .send({ message: "You dont have permission to delete this code" });
        }
        const deleteCode = await code_model_1.codeModel.findByIdAndDelete(id);
        if (deleteCode) {
            return res.status(200).send({ message: "Code Deleted Successfully" });
        }
        else {
            return res.status(404).send({ message: "Code not found" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Error deleting code!", error });
    }
};
exports.deleteCode = deleteCode;
const editCode = async (req, res) => {
    const userId = req._id;
    const postId = req.params.id;
    const fullCode = req.body;
    try {
        const owner = await user_model_1.User.findById(userId);
        if (!owner) {
            return res.status(404).send({ message: "cannot find owner!" });
        }
        const exisitingPost = await code_model_1.codeModel.findById(postId);
        if (!exisitingPost) {
            return res.status(404).send({ message: "Cannot find post to edit" });
        }
        if (exisitingPost.ownerName !== owner.username) {
            return res
                .status(400)
                .send({ message: "You dont have permission to edit this post" });
        }
        await code_model_1.codeModel.findByIdAndUpdate(postId, {
            fullCode: fullCode,
        });
        console.log(exports.editCode);
        return res.status(200).send({ message: "Post updated successfully" });
    }
    catch (error) {
        return res.status(500).send({ message: "Error Editing code!", error });
    }
};
exports.editCode = editCode;
const getAllCodes = async (req, res) => {
    try {
        const allCodes = await code_model_1.codeModel.find().sort({ createdAt: -1 });
        return res.status(200).send(allCodes);
    }
    catch (error) {
        return res.status(500).send({ message: "Error editing code!", error });
    }
};
exports.getAllCodes = getAllCodes;
