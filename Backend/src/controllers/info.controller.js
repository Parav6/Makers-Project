import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {Info} from "../models/detail.model.js";
import {User} from "../models/user.model.js"


const submitInfo = asyncHandler( async(req , res)=>{
    const {infoAbout , color,pin} = req.body;
    console.log(infoAbout,pin);

    const user = await User.findOne({pin});
    if(!user){
      throw new ApiError("402","User not Exist")
    }

    const screenShortUrl = req.files?.screenShort[0]?.path;
    console.log

     if(!screenShortUrl){
        throw new ApiError(400,"screenshort is required")
     };

     const screenShort = await uploadOnCloudinary(screenShortUrl);

     if(!screenShort){
        throw new ApiError(500,"screenshort upload failed")
     };

     const info = await Info.create({
        screenShortUrl:screenShort.url,
        infoAbout:infoAbout,
        color:color || "yellow",
        pin:pin
     });

     const createdInfo = await Info.findById(info._id);

     if(!createdInfo){
        throw new ApiError(500,"info creation failed");
    };

    return res.status(201).json(
      new ApiResponse(201,createdInfo,"info created successfully")
    );

});


const showInfo = asyncHandler( async(req , res)=>{
   const {pin} = req.body;

   const allInfo = await Info.find({pin:pin}).select(
      "-pin "
   )

   if(allInfo.length == 0){
      throw new ApiError("404","invalid pin")
   };

   console.log(allInfo);

   return res
   .status(200)
   .json(
      new ApiResponse(
          200,
          {
             allInfo
          },
          "user logged in successfully"
      )
  )

});

export {
   submitInfo,
   showInfo

}