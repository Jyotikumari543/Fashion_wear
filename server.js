import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRouters from './routes/authRouters.js';
import categoryRouters from './routes/categoryRouter.js';
import productRouters from './routes/productRouter.js';
import cors from "cors";
import path from "path"

dotenv.config();
connectDB();
//rest object


const app=express()



app.use(cors());

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname,'./client/build')))




app.use('/api/v1/auth',authRouters);
app.use('/api/v1/category',categoryRouters);
app.use('/api/v1/product',productRouters);


//rest api
app.use('*',function (req,res){
        res.sendFile(path.join(__dirname,"./client/build/index.html"));


});

//port
const PORT=process.env.PORT || 8080;

//run listen 
app.listen(PORT,()=>{
        console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
