import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.routes.js";
import { error } from 'console';
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js"


dotenv.config();

console.log("Mongo URI:", process.env.MONGO);

mongoose.connect(process.env.MONGO).then(()=>{console.log("Connected to DB")}).catch((error)=>{console.log("Error: " , error)});

console.log("Supabase URL:", process.env.VITE_SUPABASE_URL);
console.log("Supabase Anon Key:", process.env.VITE_SUPABASE_ANON_KEY);

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(cors({ origin: ['http://localhost:5173','http://localhost:5174'] }));
app.use(bodyParser.json());


app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);
app.use("/api/listing", listingRouter);

//Middleware
app.use((error, req, res, next)=>
{
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return res.status(statusCode).json(
    {
      success:false,
      statusCode,
      message,
    }
  );
});

app.get('/api/users', (req, res) => {
    res.json({})});



app.listen(port, ()=>{console.log(`Server is listening at port ${port}`)});


