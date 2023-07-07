// Schema is needed to validate the data coming from the frontend or data in general

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

const user = mongoose.model("user",userSchema);
export default user;