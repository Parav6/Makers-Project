import mongoose from 'mongoose';

const detailSchema = mongoose.Schema(
    {
        userName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        infoAbout:{
            type: String,
            trim:true
        },
        screenShortUrl:{
          type: String, 
          required: true  
        },
        color:{
            type: String,
            enum: ["red", "green",  "yellow"],
            default: "yellow"
        },
        pin:{
            type:Number,
            required:true,
        }
},{timestamps:true}
);

export const Info = mongoose.model("Info", detailSchema);