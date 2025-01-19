import { ApiError } from "../utils/ApiError.js"
import { asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js";


export const verifyJWT = asyncHandler(async(req , res ,next)=>{
    try {
        const token = req.cookies?.accessToken  ||  req.header("Authorization")?.replace("Bearer ","") 

        if(!token){
            return false
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if(!user){
            return false
        }
        req.user = user
        return true
    

    } catch (error) {
        throw new ApiError(401,error)
    }
});