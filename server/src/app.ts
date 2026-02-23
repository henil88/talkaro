import express from "express";
import router from "./routes/routes";
import connectDB from "./database";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());

app.use("/storage", express.static(path.join(__dirname, "storage")));
app.use(router);

app.get("/", (req, res) => {
  res.send("http server running perfect");
});

export default app;
