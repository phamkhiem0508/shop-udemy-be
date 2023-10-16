import prisma from "../prisma/prisma.js";
import validator from "validator";
import { handleCallback } from "../utils/handleCallback.js";
import { json } from "express";

const getUdemyAccountList = handleCallback(async (req, res) => {
  
});

const addUdemyAccount = handleCallback(async (req, res) => {
  const { email, password, jsoncookies } = req.body;

  if (validator.isEmpty(jsoncookies || "")) {
    res.status(400).send({
      message: "Jsoncookies is required",
    });
    return;
  }

  if (!validator.isEmail(email || "")) {
    res.status(400).send({
      message: "Email is not valid",
    });
    return;
  }

  const udemyAccount = await prisma.udemyAccount.findUnique({
    where: {
      email,
    },
  });

  if (udemyAccount) {
    res.status(400).send({
      message: "Email is already exist",
    });
    return;
  }

  const newUdemyAccount = await prisma.udemyAccount.create({
    data: {
      email,
      password,
      json: jsoncookies,
    },
  });

  if (!newUdemyAccount) {
    res.status(400).send({
      message: "Add new udemy account failed",
    });
    return;
  }

  return res.json(newUdemyAccount);
});

export const udemyController = {
  getUdemyAccountList,
  addUdemyAccount,
};
