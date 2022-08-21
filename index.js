
import express from 'express';
import mongoose from'mongoose'
import cors from'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

const PORT =process.env.PORT || 4000

import router from './routes/index.js'

dotenv.config()




const app = express()
//middlewares
app.use(cors({ credentials: true, origin: true, exposedHeaders: ["set-cookie"] }))
app.use(cookieParser())
app.use(express.json())
app.use('/api/v1',router)
//error handler
app.use((err,req,res,next) => {

    const status =err.status ||500
    const message = err.message ||"Something went wrong";
    return  res.status(status).json({
        succes:false,
        status,
        message
    })

})


const connection_url=process.env.MONGO_APP_KEY





const start =async()=>{
    mongoose.connect(connection_url,{
        useUnifiedTopology: true,
    })
    .then(console.log("connected"))
    .catch((err)=>console.log(err))

    
     app.listen(PORT ,()=>{
      console.log('Server started on port ', PORT)
    })
}

start()