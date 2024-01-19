// import mongoose from "mongoose";
import multer from "multer"
import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from 'dotenv'

// initialize dotenv 
dotenv.config();

const USERNAME = encodeURIComponent(process.env.DB_USERNAME);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);


const storage= new GridFsStorage({
    url:`mongodb://${USERNAME}:${PASSWORD}@ac-8xkwn5b-shard-00-00.ntkg8ag.mongodb.net:27017,ac-8xkwn5b-shard-00-01.ntkg8ag.mongodb.net:27017,ac-8xkwn5b-shard-00-02.ntkg8ag.mongodb.net:27017/?ssl=true&replicaSet=atlas-s6vfxk-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options:{useNewUrlParser:true},
    file:(request,file) =>{

        // array of file extensions which are allowed
        const match = ["image/png","image/jpg","image/jpeg"]
        // we will check whether the file extension exists in our array  using file.memeType
        //  if file extension exists then it will return  the index number i,e 0,1,2,3...n-1
        if(match.indexOf(file.mimeType)===-1)
        {
            // to ensure that each file has unique name we are concatenating file name with date
            return `${file.originalname}`;
        }
        return {
            bucketName:"photos",
            filename:`${file.originalname}`
        }
    }
})


export default multer({storage})