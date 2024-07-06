import cookieParser from "cookie-parser";
import cros from 'cors'
import express from "express";

const app = express()

app.use(cros({
    origin:"*",
    credentials:true
}))

app.use(express.json({"limit":"16kb"}))



import router from "./routes/userRoutes.js";
app.use("/api/v1",router)
app.use("/api/v2",router)


export default app