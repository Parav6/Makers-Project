import {v2 as cloudinary} from "cloudinary";
import fs from "fs"



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath){
            return null;
        };
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
            timestamp: Math.floor(Date.now() / 1000)
        });

        // console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Error while uploading file on cloudinary ", error); 
        return null; 
    }
};  


export {uploadOnCloudinary};