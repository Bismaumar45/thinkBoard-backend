import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// ---------- Middleware ----------
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173"
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ---------- Routes ----------
app.get("/", (req, res) => {
  res.json({ ok: true, message: "API running" });
});
app.use("/api/notes", notesRoute);

await connectDB();


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log("Local dev server on", PORT);
  });
}


export default app;
