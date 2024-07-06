import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express()

console.log("app is working");

app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
app.use(cors({origin:"*",credentials:true}))

import userRoute from './routes/userRoutes.js'
app.use("/api/v1/user",userRoute)

export default app;