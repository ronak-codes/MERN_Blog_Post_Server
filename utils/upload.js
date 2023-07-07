import multer from "multer"
import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from 'dotenv'

// initialize dotenv 
dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
// console.log(USERNAME,"username");
// console.log(PASSWORD,"Password");

const storage= new GridFsStorage({
    url:`mongodb://${USERNAME}:${PASSWORD}@ac-8xkwn5b-shard-00-00.ntkg8ag.mongodb.net:27017,ac-8xkwn5b-shard-00-01.ntkg8ag.mongodb.net:27017,ac-8xkwn5b-shard-00-02.ntkg8ag.mongodb.net:27017/?ssl=true&replicaSet=atlas-s6vfxk-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options:{useNewUrlParser:true},
    file:(request,file) =>{

        // array of file extensions which are allowed
        console.log("Image");
        // console.log(request);
        const match = ["image/png","image/jpg"]
        // we will check whether the file extension exists in our array  using file.memeType
        //  if file extension exists then it will return  the index number i,e 0,1,2,3...n-1
        if(match.indexOf(file.memeType)===-1)
        {
            console.log("File extension invalid");
            // to ensure that each file has uniqu name we are concattenating file name with date
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
})


export default multer({storage})