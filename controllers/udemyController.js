import prisma from "../prisma/prisma.js";
import validator from "validator";

const getUdemyAccountList = async (req, res) => {};

const addUdemyAccount = async (req, res) => {
  const { email, password } = req.body;
  if (validator.isEmpty(email || "")) {
    res.status(400).send({
      message: "Email is required",
    });
    return;
  }
};

export const udemyController = {
  getUdemyAccountList,
  addUdemyAccount,
};
