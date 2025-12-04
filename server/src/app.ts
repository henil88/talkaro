import express from "express";
import router from "./routes/routes";
const app = express();

app.use(express.json());
app.use(router);
app.get("/", (req, res) => {
  res.send("htttp server rinning perfect");
});

export default app;
