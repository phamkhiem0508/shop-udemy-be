import prisma from "../../prisma/prisma.js";
import jwt from "jsonwebtoken";

class JwtAuth{
    _token = null;

    constructor(tokenType){
        this._token = process.env[tokenType];
    }

    verifyToken(token){
        // const userToken = req.headers.authorization.split(" ")[1];
        return jwt.verify(token, this._token);
    }

    signToken(data){
        return jwt.sign(data, this._token, {expiresIn: "30d"});
    }
}

export default JwtAuth;