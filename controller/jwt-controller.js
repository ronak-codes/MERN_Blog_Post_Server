import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();



export const authenticateToken = (request,response,next) =>{

    const authHeader = request.headers["authorization"];
    // since our token is concatenated with bearer we will split it to get the token only
    const token = authHeader && authHeader.split(" ")[1];
    if(token==null)
    {
        return response.status(401).json({msg:"token is missing"});
    }
    // jwt.verify() takes three arguments the first is user token , second is token stored in env file and third is callback funtion which can perform action based on 
    //  whether token are matched or not.
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error,user)=> {
        if(error){
            return response.status(401).json({msg:'invalid Token'})
        }
        request.user=user;
        next();
    })
}