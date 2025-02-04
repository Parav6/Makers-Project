import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";


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
    const { userName, email, password } = req.body;
    console.log(userName,password,email);

    if(!(userName && password && email)){
        throw new ApiError(400 , "All fields are Required");
    };

    const pin = generateUniqueCode(userName,password);

    const existedUser = await User.findOne({pin});
    if(existedUser){
        throw new ApiError(409,"User already exist");
    };


    const user = await User.create({
        userName:userName,
        password:password,
        email:email,
        pin:pin
    });

    const createdUser = User.findById(user._id).select(
        "-password -pin"
    );

    if(!createdUser){
        throw new ApiError(500, "unable to create user")
    };


    return res.render("showPin",{pin:pin})

    // return res.status(200).json(
    //     new ApiResponse(200,pin,"User created successfully")
    // );


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
  
    const loggedInUser = await User.findById(user._id).select(
        "-password -pin"
    );

    return res
    .status(200)
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

const getRegisterUser = asyncHandler( async(req,res)=>{
    res.render("main")
});

const getLoginUser = asyncHandler( async(req,res)=>{
    res.render("pin")
});

export {
    registerUser,
    loginUser,
    getRegisterUser,
    getLoginUser
};