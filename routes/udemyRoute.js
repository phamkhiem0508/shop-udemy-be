import express from "express";
import { udemyController } from "../controllers/udemyController.js";

const router = express.Router();

router.get("/admin/udemy/account-list",udemyController.getUdemyAccountList);

router.post("/admin/udemy/add-account",udemyController.addUdemyAccount);


export default router;