const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cookieparser=require('cookie-parser');//to read the cookie send by the browser.
const cors=require('cors');
require("dotenv").config();
const {Errorhandler,errorMiddleware}=require('./middleware/error');  

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","PATCH","DELETE","POST"],
    credentials:true,
}));
app.use(express.json()); //to convert the json message into javascript objects.
app.use(express.urlencoded({extended:true}));//to parse the form data.

app.use((req,res,next)=>{
    console.log("URL:",req.url + "Method:",req.method);
    next();
})

app.get("/",(req,res)=>{
    res.send("hello i am building the authentication and authorization")
})
mongoose.connect(process.env.MONGO_DB)
.then(()=>{ 
    console.log("Database connect successfully");
    const PORT=process.env.PORT||3000;
    app.listen(PORT,()=>{
        console.log(`The server is running at the port:${PORT}`);
    })
})
.catch((error)=>{
    console.log("Error occured:",error);
})
app.use(errorMiddleware);