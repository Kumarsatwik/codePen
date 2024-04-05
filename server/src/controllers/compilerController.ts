import { Request, Response } from "express";
import { codeModel } from "../models/code.model";
import { fullCodeType } from "../types/compilerTypes";
import { User } from "../models/user.model";

interface AuthRequest extends Request {
  _id?: string;
}

export const saveCode = async (req: AuthRequest, res: Response) => {
  const { fullCode, title }: { fullCode: fullCodeType; title: String } =
    req.body;

  let ownerName = "Anonymous";
  let ownerInfo = undefined;
  let isAuthenticated = false;
  let user = undefined;
  if (req._id) {
    user = await User.findById(req._id);
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
    const newCode = await codeModel.create({
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
  } catch (error) {
    return res.status(500).send({ message: "Error saving code ", error });
  }
};

export const loadCode = async (req: AuthRequest, res: Response) => {
  const { urlId } = req.body;
  let isOwner = false;
  const userId = req._id;

  try {
    const code = await codeModel.findById(urlId);

    if (!code) {
      return res.status(404).send({ message: "Code not found" });
    }

    const user = await User.findById(userId);
    if (user?.username === code.ownerName) {
      isOwner = true;
    }
    return res.status(200).send({ fullCode: code.fullCode, isOwner });
  } catch (error) {
    return res.status(500).send({ message: "Error loading code ", error });
  }
};

export const deleteCode = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  try {
    const owner = await User.findById(userId);
    const { id } = req.params;
    if (!owner) {
      return res.status(404).send({ message: "Cannot find user" });
    }
    const exisitingCode = await codeModel.findById(id);
    if (!exisitingCode) {
      return res.status(404).send({ message: "Code not found" });
    }

    if (exisitingCode.ownerInfo != owner.username) {
      return res
        .status(400)
        .send({ message: "You dont have permission to delete this code" });
    }

    const deleteCode = await codeModel.findByIdAndDelete(id);
    if (deleteCode) {
      return res.status(200).send({ message: "Code Deleted Successfully" });
    } else {
      return res.status(404).send({ message: "Code not found" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error deleting code!", error });
  }
};
export const editCode = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  const postId = req.params.id;
  const fullCode = req.body;
  try {
    const owner = await User.findById(userId);
    if (!owner) {
      return res.status(404).send({ message: "cannot find owner!" });
    }
    const exisitingPost = await codeModel.findById(postId);
    if (!exisitingPost) {
      return res.status(404).send({ message: "Cannot find post to edit" });
    }
    if (exisitingPost.ownerName !== owner.username) {
      return res
        .status(400)
        .send({ message: "You dont have permission to edit this post" });
    }
    await codeModel.findByIdAndUpdate(postId, {
      fullCode: fullCode,
    });

    console.log(editCode);
    return res.status(200).send({ message: "Post updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error Editing code!", error });
  }
};

export const getAllCodes = async (req: Request, res: Response) => {
  try {
    const allCodes = await codeModel.find().sort({ createdAt: -1 });
    return res.status(200).send(allCodes);
  } catch (error) {
    return res.status(500).send({ message: "Error editing code!", error });
  }
};
