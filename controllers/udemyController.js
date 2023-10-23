import prisma from "../prisma/prisma.js";
import validator from "validator";
import { handleCallback } from "../utils/handleCallback.js";
import { json } from "express";
import Wgualumni from "../models/udemy/wgualumni.js";

const getUdemyAccountList = handleCallback(async (req, res) => {});

const addUdemyAccount = handleCallback(async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email || "") || validator.isEmpty(username || "")) {
    res.status(400).send({
      message: "Email or Username is not valid",
    });
    return;
  }

  if (validator.isEmpty(password || "")) {
    res.status(400).send({
      message: "Password is not valid",
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

export const getAccountCookies = handleCallback(async (req, res) => {
  const { email, username } = req.body;

  if (!validator.isEmail(email || "") || validator.isEmpty(username || "")) {
    res.status(400).send({
      message: "Email or Username is not valid",
    });
    return;
  }

  const udemyAccount = await prisma.udemyAccount.findUnique({
    where: {
      or: [{ email }, { username }],
    },
  });

  if (!udemyAccount) {
    res.status(400).send({
      message: "Email or Username is not exist",
    });
    return;
  }

  const { username: accountUdemyUsername, password } = udemyAccount;

  const udemyAccountCookies = new Wgualumni("wgualumni", "https://wgualumni.udemy.com/");

  const cookies = await udemyAccountCookies.login(accountUdemyUsername, password);

  return res.json(cookies);
});

export const udemyController = {
  getUdemyAccountList,
  addUdemyAccount,
  getAccountCookies,
};
