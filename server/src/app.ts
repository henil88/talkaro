import express from "express";
import router from "./routes/routes";
import connectDB from "./database";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

connectDB();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.get("/", (req, res) => {
  res.send("http server running perfect");
});

export default app;
