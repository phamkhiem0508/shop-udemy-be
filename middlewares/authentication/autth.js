import prisma from "../../prisma/prisma";

class Auth{
    _token = null;

    constructor(tokenType){
        this._token = process.env[tokenType];
    }


    verifyToken(req, res, next){
        
    }


    signToken(data){
        return jwt.sign(data, this._token, {expiresIn: "1d"});
    }
}