import grid from 'gridfs-stream'
import mongoose from 'mongoose';

const Url = "http://localhost:8000/"

let gridfsBucket,gfs;

const conn = mongoose.connection;

conn.once('open',()=>{
    console.log("Connection was open");
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    })
    gfs=grid(conn.db,mongoose.mongo); 
    gfs.collection('fs');
    // console.log("Exiting from once");
})


export const uploadImage = (request,response) =>{

    console.log("uploadImage");
    console.log(request);
    if(!request.file)
    {
        console.log("Error in getting file inside image controller");
        return response.status(404).json({msg:"file not found"});
    }
    const imageUrl=`${Url}/file/${request.file.filename}`;
    
    return response.status(200).json(imageUrl);
}

export const getImage =  async (request,response) =>{
    try{
        console.log("Fetch Image");
        // quering database to find the file using name
        const file = await gfs.files.findOne({filename:request.params.filename});
        // downloading file in the form of stream from db
        const readStream= await gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
        
    }catch(error){

        return response.status(500).json({msg:error.message});

    }

}