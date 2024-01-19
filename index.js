import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from "./routes/route.js"
import cors from "cors"
import bodyParser from "body-parser"

dotenv.config();
const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",Router);
const PORT=8000;
app.listen(PORT, () => console.log(`Server is running on Port Number: ${PORT}`));


const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
// Make connection with the database by calling Connection function/Component
Connection(USERNAME,PASSWORD);
 
