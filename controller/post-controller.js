import Post from '../model/post.js'

export const createPost = async (request,response) =>{
    try{
        const post = await new Post(request.body);
        post.save();
        return response.status(200).json({msg:"Post Saved Successfully"});

    }catch(error){
        return response.status(400).json({msg:"Error While Saving the Post"});
    }
}


export const getAllPosts = async (request,response) => {
    // console.log("called with category",request.query.category)

    let category =  request.query.category;  
    let posts;
    try{
        if(category)
        {
            posts= await Post.find({categories:category});
            return response.status(200).json(posts);
        }
        else
        {
            posts = await Post.find({});
            return response.status(200).json(posts);
        } 

    }catch(error){
        return response.status(500).json({msg:error.message});
    }

}

export const getPost = async (request,response) =>{

    try{
        const post = await Post.findById(request.params.id);
        return response.status(200).json(post);

    }catch(error)
    {
        return response.status(500).json({msg:error.message});
    }

}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if(!post)
        {
            response.status(404).json({mag:"Post Not Found"})
        }  
        await post.delete()
        response.status(200).json({msg:'Post Deleted Successfully'});
    } catch (error) {
        response.status(500).json({error:error.message})
    }
}

export const updatePost = async (request,response) =>{

    // console.log("request",request.params.id)

    try{

        let post = await Post.findById(request.params.id)
        if(!post)
        {
            response.status(404).json({mag:"Post Not Found"})
        }
        await Post.findByIdAndUpdate(request.params.id,{$set:request.body})
        response.status(200).json({msg:"Post Updated Successfully"}) 

    }catch(error){
        response.status(500).json({error:error.message})

    }

}