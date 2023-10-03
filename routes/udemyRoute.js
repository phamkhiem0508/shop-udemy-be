import express from "express";
import { udemyController } from "../controllers/udemyController.js";

const router = express.Router();

router.get("/account-list",udemyController.getUdemyAccountList);

router.post("/add-account",udemyController.addUdemyAccount);


export default router;