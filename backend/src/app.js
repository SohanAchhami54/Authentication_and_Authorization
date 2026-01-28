import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import {errorMiddleware} from './middleware/error.middleware.js'
import {connection} from './config/db.js'
import authRouter from './routes/auth/index.js'
dotenv.config()
const app=express();


app.use(cors({ 
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","PATCH","DELETE","POST"],
    credentials:true,
}));
app.use(express.json()) //to convert the json message into javascript objects.
app.use(express.urlencoded({extended:true}))//to parse the form data.
app.use(cookieParser())

app.use((req,res,next)=>{
    console.log("URL:",req.url + "Method:",req.method)
    next();
})

app.get("/",(req,res)=>{
    res.send("hello i am building the authentication and authorization")
})
//database connection
  connection()
  .then(()=>{
    console.log('Database connected successfully')
    const PORT=process.env.PORT||3000;
    app.listen(PORT,()=>{
        console.log(`The server is running at the port:${PORT}`)
    })
  })
.catch((error)=>{
    console.log("Error occured:",error)
})

app.use('/api/auth',authRouter)




//app.use(Errorhandler);
app.use(errorMiddleware)