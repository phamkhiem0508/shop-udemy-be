import express from "express";
import { adminUserController } from "../controllers/adminUserController.js";

const router = express.Router();

router.post("/register",  adminUserController.registerUser);

export default router;
