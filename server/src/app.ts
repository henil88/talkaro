import express from "express";
import router from "./routes/routes";
import connectDB from "./database";
import path from "path";

const app = express();

connectDB();
app.use(express.json());

app.use("/storage", express.static(path.join(__dirname, "storage")));
app.use(router);

app.get("/", (req, res) => {
  res.send("http server running perfect");
});

export default app;
