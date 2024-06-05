import express from "express";
import dotenv from "dotenv";
import connectToDb from "./db/connectToDb.js";
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import cookieParser from "cookie-parser";
import getUser from "./routes/getRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000 ;

// Middle ware to extract info from json files
app.use(express.json());
app.use(cookieParser());

// Authentication
app.use("/auth", authRoutes);
app.use("/message", messageRoutes);
app.use("/user", getUser);

// Connection to server and database

app.listen(PORT,() => {
    connectToDb();
    console.log(`Listening on port ${PORT} `);
});