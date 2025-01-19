import mongoose from "mongoose";

const folderSchema = mongoose.Schema(
    {
        userName:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        color:{
            type: String,
            enum: ["red", "green",  "yellow"],
            default: "yellow"
        }
},{timestamps:true}
);

export const Folder = mongoose.model("Folder", folderSchema);