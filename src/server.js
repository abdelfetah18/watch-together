const express = require("express");
var cookieParser = require('cookie-parser');
const next = require('next');
const { verifyToken } = require("./utils/encryption.js");

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// When using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const web_socket_server = require("./web_socket/index.js");
const http = require('http');
const router = require("./routes/index.js");

app.prepare().then(() => {
  const server = express();
  const http_server = http.createServer(server);
  const ws = web_socket_server(http_server);

  // use a cookie parser
  server.use(cookieParser());

  server.use("/", router);

  server.post("*/*", ( req, res, next) => {
    return handle( req, res);
  });

  server.get("*/*", ( req, res, next) => {
    return handle( req, res);
  });

  http_server.listen(port, () => {
    console.log("Server is up runing on port:", port);
  })
});
