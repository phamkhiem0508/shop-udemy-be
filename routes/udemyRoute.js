import express from "express";
import { udemyController } from "../controllers/udemyController.js";
import validator from "validator";

const router = express.Router();

router.get("/admin/udemy/account-list",udemyController.getUdemyAccountList);

router.post("/admin/udemy/add-account",udemyController.addUdemyAccount);

router.post("/admin/udemy/download-cookies",udemyController.getAccountCookies);

export default router;