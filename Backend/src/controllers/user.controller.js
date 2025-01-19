import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";

// const generateAccessAndRefreshTokens = async(userId)=>{
//     try {
//         const user = await User.findById(userId);
//         const accessToken = user.generateAccessToken();
//         const refreshToken = user.generateRefreshToken();
//         user.refreshToken= refreshToken;
//         await user.save({validateBeforeSave:false});
//         return{accessToken,refreshToken};
//     } catch (error) {
//         throw new ApiError(500,"something went wrong while generating tokens")
//     }
// };

const generateUniqueCode = (username, password)=> {
    const combined = `${username}:${password}`;
    
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        const charCode = combined.charCodeAt(i);
        hash = (hash * 31 + charCode) % 100000; 
    }
  
    return hash.toString().padStart(5, '0');
  };

const registerUser = asyncHandler( async(req , res)=>{
    const {userName,password} = req.body;
    console.log(userName,password);

    if(!(userName && password)){
        throw new ApiError(400 , "Both fields are Required");
    };

    const pin = generateUniqueCode(userName,password);

    const existedUser = await User.findOne({pin});
    if(existedUser){
        throw new ApiError(409,"User already exist");
    };


    const user = await User.create({
        userName:userName,
        password:password,
        pin:pin
    });

    const createdUser = User.findById(user._id).select(
        "-password -pin"
    );

    if(!createdUser){
        throw new ApiError(500, "unable to create user")
    };

    return res.status(200).json(
        new ApiResponse(200,pin,"User created successfully")
    );
    
});

const loginUser = asyncHandler( async(req, res)=>{
    const {pin} = req.body;

    if(!pin){
        throw new ApiError(400,"Pin is required");
    };

    const user = await User.findOne({pin});

    if(!user){
        throw new ApiError(401,"User does not exist");
    };

    // const isPasswordValid = await user.isPasswordCorrect(password);

    // if(!isPasswordValid){
    //     throw new ApiError(404,"invalid user credential ")
    // }; 
    
    // const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id); 

    // localStorage.setItem("accessToken",JSON.stringify(accessToken));
    // localStorage.setItem("refreshToken",JSON.stringify(refreshToken));
  
    const loggedInUser = await User.findById(user._id).select(
        "-password -pin"
    );

    // const options = {
    //     httpOnly : true,                            //due to this cookies are only modifiable through server
    //     secure : true ,
    //     sameSite : "Lax"
    // };

    console.log("yesss!!!!!")

    return res
    .status(200)
    // .cookie("accessToken",accessToken,options)
    // .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser,
                pin:pin
            },
            "user logged in successfully"
        )
    )
}); 

const verifyUser = asyncHandler(async (req , res)=>{
    // const user = req.user;
    // if(!user){
    //     throw new ApiError(403,"user not logged in")
    // };

    // return res
    // .status(200)
    // .json(
    //     new ApiResponse(200,user,"user is logged in")
    // )
});

const logOutUser = asyncHandler(async(req,res)=>{
     
    // const {pin} = req.body;
    // await User.findByIdAndUpdate(
    //     req.user._id,
    //     {
    //         $set:{
    //             refreshToken : undefined
    //         }
    //     },
    //     {
    //         new : true
    //     }
    // );

    // const options = {
    //     httpOnly : true,                            //due to this cookies are only modifiable through server
    //     secure : true 
    // };

    // return res
    // .status(200)
    // .clearCookie("accessToken",options)
    // .clearCookie("refreshToken",options)
    // .json(
    //     new ApiResponse(200 , {},"user logged out successfully")
    // )
});




const showLogin = asyncHandler(async(req,res)=>{
    // ---------------
});

export {
    registerUser,
    loginUser,
    verifyUser,
    logOutUser,
    showLogin
};