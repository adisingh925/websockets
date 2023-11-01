const express = require("express");
const http = require("http");
const https = require("https");
const WebSocket = require("ws");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 60001;

app.use(cors());

const server = new https.createServer(
  {
    cert: fs.readFileSync("ssl/certificate.cer"),
    key: fs.readFileSync("ssl/private_key.key"),
  },
  app
);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {
    wss.clients.forEach((element) => {
      element.send(JSON.stringify({ msg: `${message}`, success: true }));
    });
  });

  //send immediatly a feedback to the incoming connection
  ws.send(JSON.stringify({ success: true }));
});

//start our server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
