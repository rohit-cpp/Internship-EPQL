import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
declare global{
    namespace Express{
        interface Request{
            id: string; 
        }
    }
}
export const isAutheticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        //verify the token
        const decode = jwt.verify(token, process.env.SECERET_KEY!) as jwt.JwtPayload;
        //check is decoding was successfull
        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
};