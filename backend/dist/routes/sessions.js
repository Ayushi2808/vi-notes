"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionController_1 = require("../controllers/sessionController");
const router = (0, express_1.Router)();
router.post("/", sessionController_1.saveSession);
router.get("/", sessionController_1.getSessions);
exports.default = router;
