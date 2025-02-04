import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {Info} from "../models/detail.model.js";
import {User} from "../models/user.model.js"


const submitInfo = asyncHandler( async(req , res)=>{
    const {infoAbout , color,pin} = req.body;

    const user = await User.findOne({pin});
    if(!user){
      throw new ApiError("402","User not Exist")
    }

    const screenShortUrl = req.files?.screenShort[0]?.path;
    console.log

     if(!screenShortUrl){
        throw new ApiError(400,"screenShort is required")
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


const getShowInfo = asyncHandler(async(req,res)=>{

   const pin = req.query.pin;

   const allInfo = await Info.find({pin:pin}).select(
      "-pin "
   );

   if(allInfo.length == 0){
      throw new ApiError("404","invalid pin")
   };

 
   res.render("show",{myArray:allInfo})
});


export {
   submitInfo,
   getShowInfo

}