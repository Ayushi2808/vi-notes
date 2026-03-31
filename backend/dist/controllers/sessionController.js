"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessions = exports.saveSession = void 0;
const Session_1 = __importDefault(require("../models/Session"));
// Save a typing session
const saveSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionData = req.body;
        const session = new Session_1.default(sessionData);
        yield session.save();
        res.status(201).json({ message: "Session saved!" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.saveSession = saveSession;
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
const getSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessions = yield Session_1.default.find();
        res.json(sessions);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getSessions = getSessions;
