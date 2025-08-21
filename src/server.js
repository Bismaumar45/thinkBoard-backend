import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import notesRoute from "./routes/notesRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS
const allowed = "http://localhost:5173";
if (process.env.FRONTEND_URL) allowed.push(process.env.FRONTEND_URL);
app.use(cors({ origin: allowed, credentials: true }));

// Routes
app.get("/", (req, res) => res.json({ ok: true, message: "API running" }));
app.use("/api/notes", notesRoute);

// DB connect (cold start)
await connectDB();

// Local dev only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log("Local dev server on", PORT));
}

export default app;
