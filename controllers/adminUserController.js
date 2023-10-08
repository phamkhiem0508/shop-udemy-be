import jwtAuthAdmin from "../middlewares/authentication/jwtAuthAdmin.js";
import prisma from "../prisma/prisma.js";
import validator from "validator";
import { jwtRegex } from "../utils/regex.js";
import { handleCallback } from "../utils/handleCallback.js";

const registerUser = async (req, res) => {
  const adminUser = await prisma.adminUser.create({
    data: {
      email: req.body.email,
      username: req.body.username,
    },
  });
  console.log(error);

  return res.json(adminUser);
};

const updateUser = async (req, res) => {
  const adminUser = await prisma.adminUser.update({
    where: {
      email: req.body.email,
    },
    data: {
      username: req.body.username,
      name: req.body.name,
    },
  });

  return res.json(adminUser);
};

const loginUser = handleCallback(async (req, res) => {
  const { email, password } = req.body;

  if (validator.isEmpty(email || "")) {
    return res.status(400).send({
      message: "Email is required",
    });
  }

  if (!validator.isEmail(email || "")) {
    return res.status(400).send({
      message: "Email is not valid",
    });
  }

  if (validator.isEmpty(password || "")) {
    return res.status(400).send({
      message: "Password is required",
    });
  }

  const adminUser = await prisma.adminUser.findUnique({ where: { email } });

  if (adminUser === null) {
    return res.status(400).send({ message: "Not found this account" });
  }

  if (adminUser.password !== password) {
    return res.status(400).send({ message: "Password is not correct" });
  }

  delete adminUser?.password;

  return res.json({ user: { ...adminUser }, token: jwtAuthAdmin.signToken({ email: adminUser.email }) });
})

const checkToken = handleCallback(async (req, res) => {
  const headerToken = req?.headers?.authorization.split(" ")[1] || "";

  const token = req.body?.token || jwtRegex.match(headerToken) ? headerToken : "";

  if (validator.isEmpty(token || "")) {
    return res.status(400).send({ message: "Token is required" });
  }

  const decoded = jwtAuthAdmin.verifyToken(token);

  if (!decoded) {
    return res.status(400).send({ message: "Token is not valid" });
  }

  const adminUser = await prisma.adminUser.findUnique({ where: { email: decoded.email } });

  if (adminUser === null) {
    return res.status(400).send({ message: "Not found this account" });
  }

  delete adminUser?.password;

  return res.json({ user: { ...adminUser }, token: jwtAuthAdmin.signToken({ email: adminUser.email }) });
});

export const adminUserController = {
  registerUser,
  updateUser,
  loginUser,
  checkToken,
};
