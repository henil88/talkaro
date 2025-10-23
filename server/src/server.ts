import { config } from "dotenv";
import app from "./app";
config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("htttp server rinning perfect");
});
app.listen(PORT, () => {
  console.log("server is run on port no ", PORT);
});
