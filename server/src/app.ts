import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("htttp server rinning perfect");
});

export default app;
