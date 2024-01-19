import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import User from '../model/user.js'
import Token from '../model/token.js'

dotenv.config();
export const signUpUser = async (request,response) =>{
    try{
        // getting the user input and storing it in user variable
       const hashedPassword = await bcrypt.hash(request.body.password,10);
        const user={name:request.body.name,username:request.body.username,password:hashedPassword};
        // Since we need to validate the data entered by user for its correctness we will define schema of our data and pass user entered data to this schema
        const newUser = new User(user);
        // .save() method is used to save data in the database
        await newUser.save();
        console.log("Saved")
        return response.status(200).json({msg:"signup Sucessful"});
    }catch(err){
        return response.status(500).json({msg:"Error While SigningUp the user"});

    } 
}

export const loginUser = async(request,response) =>{
    let user = await User.findOne({username:request.body.username});
    if(!user)
    {
            return response.status(400).json({msg:"username does not exists"});
    }

    try{
            let match =  await bcrypt.compare(request.body.password,user.password);
            if(match)
            {
                // jsonwebtoken has sign() method which generate a token by combining body(data) with a secret key
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn :'30m' });
                // if access token is expired then next access token is generated wih the help of refresh token 
                const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
                // since we each new user will have a access token and refreshtoken and for each user their respective refresh token will be used to generate access token 
                // so we need to store refresh token of each user and for that we will create a new collection in mongoDb
                const newToken = new Token({token:refreshToken});
                // console.log(newToken);
                await newToken.save();
                return response.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username});

            }
            else
            {
                return response.status(400).json({msg:"Password does not match"});
            }   

    }catch(error){

        return response.status(500).json({msg:"Error While Login the User"});

    }

}