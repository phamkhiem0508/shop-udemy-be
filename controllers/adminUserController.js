import prisma from "../prisma/prisma.js"

const registerUser = async (req, res) => {
    console.log(req.body);
    const adminUser = await prisma.adminUser.create({
        data: {
            email: req.body.email,
            username: req.body.username,
        },
    });


    return res.json(adminUser);

}

export const adminUserController =  {
    registerUser,
}