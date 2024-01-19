import express from "express";
import { signUpUser, loginUser } from "../controller/user-controller.js";
import { getImage,uploadImage } from "../controller/image-controller.js";
import upload from '../utils/upload.js'
import {createPost,getAllPosts,getPost,deletePost,updatePost} from '../controller/post-controller.js'
import {authenticateToken} from '../controller/jwt-controller.js'

import {newComment,getComments,deleteComment} from "../controller/comment-controller.js"

const router = express.Router();
// post request will be made from frontend with signup data as object 
// Here signUpUser is a callback function that we will write in separate file because this file is used for defining routes(we can also write callback function in the same file but for better approach we will separate them)
router.post("/signup",signUpUser);
router.post("/login",loginUser);
// here upload.single() is a middleware 
// we are using middleware to handle the image , i.e to check the format of the image,its extension , its data, and make suitable changes for its storage in the database.
router.post("/file/upload", upload.single('file'), uploadImage);

router.get('/file/:filename', getImage);

router.post('/create', authenticateToken ,createPost);

router.get('/posts',authenticateToken,getAllPosts);

router.get('/post/:id', authenticateToken, getPost);

router.delete('/delete/:id', authenticateToken, deletePost);

router.put('/update/:id',authenticateToken,updatePost)

router.post('/comment/new', authenticateToken, newComment);

router.get('/comments/:id', authenticateToken, getComments); 

router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;