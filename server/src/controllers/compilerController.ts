import { Request, Response } from "express";
import { codeModel } from "../models/code.model";
export const saveCode = async (req: Request, res: Response) => {
  const { fullCode } = req.body;
  try {
    const newCode = await codeModel.create({
      fullCode,
    });
    return res.status(201).send({ url: newCode._id, status: "Saved" });
  } catch (error) {
    return res.status(500).send({ message: "Error saving code ", error });
  }
};

export const loadCode = async (req: Request, res: Response) => {
  const { urlId } = req.body;

  try {
    const code = await codeModel.findById(urlId);

    if (!code) {
      return res.status(404).send({ message: "Code not found" });
    }

    return res.status(200).send({ fullCode: code.fullCode });
  } catch (error) {
    return res.status(500).send({ message: "Error loading code ", error });
  }
};
