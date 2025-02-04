import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
        userName:{
            type : String,
            required : true,
            lowercase : true,
            trim: true,
        },
        email:{
            type : String,
            require : true,
            email : true
        },
        password:{
            type : String,
            required : [true, "Password is required"],
        },
        pin:{
            type:Number,
            required:true,
            unique:true,
            index:true
        }
}
    ,{timestamps: true}
);

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    };
    next();
});


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
};


export const User = mongoose.model("User", userSchema);