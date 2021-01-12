/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// https://tutorialedge.net/typescript/typescript-socket-io-tutorial/

import * as express from 'express';
import * as socketio from "socket.io";

const app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to tombola-services!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
  console.log("a user connected");
});