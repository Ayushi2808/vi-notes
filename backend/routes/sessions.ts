import { Router } from "express";
import { saveSession, getSessions } from "../controllers/sessionController";

const router = Router();

router.post("/", saveSession);

router.get("/", getSessions);

export default router;