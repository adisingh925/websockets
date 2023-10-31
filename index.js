const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const port = 60001;

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {
    ws.send(JSON.stringify({msg: `${message}`, success: true}));
  });
  
  //send immediatly a feedback to the incoming connection
  ws.send(JSON.stringify({success: true}));
});

//start our server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
