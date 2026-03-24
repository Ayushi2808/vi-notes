import { Request, Response } from "express";
import Session, { ISession } from "../models/Session";

// Save a typing session
export const saveSession = async (req: Request, res: Response) => {
  try {
    const sessionData: ISession = req.body;
    const session = new Session(sessionData);
    await session.save();
    res.status(201).json({ message: "Session saved!" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get all sessions for a user
// export const getSessions = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.userId;
//     const sessions = await Session.find({ userId });
//     res.json(sessions);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const getSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};