import prisma from "../prisma/prisma.js";

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
export const adminUserController = {
  registerUser,
  updateUser
};
