import prisma from "../prisma/prisma.js";
import validator from "validator";

const getUdemyAccountList = async (req, res) => {

};

const addUdemyAccount = async (req, res) => {
    const result = validator.isEmpty(req?.body?.email);
    console.log(result);
}

export const udemyController = {
    getUdemyAccountList,
    addUdemyAccount
}