import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js"
// import imageRoutes from "./routes/image.routes.js"
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cors from "cors"
dotenv.config();
const app = express();
const port = 5599 || process.env.PORT;

const userName = process.env.USER;
const password = process.env.PASSWORD;

app.use(bodyParser.json())
app.use(cors("*"));
// app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api", userRoutes)
app.use('/uploads', express.static('uploads'));
// app.use("/", imageRoutes)

mongoose.connect(`mongodb+srv://${userName}:${password}@cluster101.lhmxp9v.mongodb.net/`).then(() => {

    console.log("Database Connected")
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})