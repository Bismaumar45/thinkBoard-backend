import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import path from "path"

import notesRoute from "./routes/notesRoute.js";
import {connectDB} from "./config/db.js";

dotenv.config();
const app= express();
const PORT=process.env.PORT || 5001;
const __dirname=path.resolve()


//middleware
app.use(express.json());
if(process.env.NODE_ENV !== "production"){
  app.use(
      cors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      }
  ));
}

app.use("/api/notes", notesRoute);
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  });
}
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("MONGODB CONNECTED & Server started on PORT:", PORT);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });