import mongoose from "mongoose";
mongoose.set('strictQuery',true);


const Connection = async (USERNAME,PASSWORD) => {
    USERNAME=encodeURIComponent(USERNAME);
    PASSWORD=encodeURIComponent(PASSWORD);
    const url=`mongodb://${USERNAME}:${PASSWORD}@ac-8xkwn5b-shard-00-00.ntkg8ag.mongodb.net:27017,ac-8xkwn5b-shard-00-01.ntkg8ag.mongodb.net:27017,ac-8xkwn5b-shard-00-02.ntkg8ag.mongodb.net:27017/?ssl=true&replicaSet=atlas-s6vfxk-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        // mongoose.connect it is asynchronous function therefore we use async and await 
        await mongoose.connect(url, {useNewUrlParser:true})
    }catch(err)
    {
        console.log("An Error has occured while connecting with the Database",err);
    }
}

export default Connection;
