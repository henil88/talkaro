import "dotenv/config";
import app from "./app";
import { createServer } from "http";
import { socketInit } from "./socket";
const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
socketInit(httpServer);
httpServer.listen(PORT, () => {
  console.log("server is run on port no ", PORT);
});
