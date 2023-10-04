import express from "express";
import { adminUserController } from "../controllers/adminUserController.js";

const router = express.Router();

router.post("/admin/login", adminUserController.loginUser);

router.post("/admin/register",  adminUserController.registerUser);

router.put("/admin/update", adminUserController.updateUser);


export default router;
