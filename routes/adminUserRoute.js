import express from "express";
import { adminUserController } from "../controllers/adminUserController.js";

const router = express.Router();

router.post("/admin/user/register",  adminUserController.registerUser);

router.put("/admin/user/update", adminUserController.updateUser);


export default router;
