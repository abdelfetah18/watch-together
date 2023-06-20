const express = require("express");
var cookieParser = require('cookie-parser');
const next = require('next');
const { verifyToken } = require("./utils/encryption.js");

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const web_socket_server = require("./web_socket/index.js");
const http = require('http');

app.prepare().then(() => {
  const server = express();
  const http_server = http.createServer(server);
  const ws = web_socket_server(http_server);
  
  // use a cookie parser
  server.use(cookieParser());

  server.get("/user/sign_in",async ( req, res, nextR) => {
    let access_token = req.headers.authorization || req.cookies.access_token;
    if(access_token){
      try {
        let is_valid = await verifyToken(access_token);
        req.user = is_valid.payload;
        res.redirect("/profile");
      }catch(err){
        nextR();
      }
    }else{
      nextR();
    }
  });

  server.use("/api/user",async ( req, res, nextR) => {
    let access_token = req.headers.authorization || req.cookies.access_token;
    if(access_token){
      try {
        let is_valid = await verifyToken(access_token);
        req.user = is_valid.payload;
        nextR();
      }catch(err){
        res.redirect("/user/sign_in");      }
    }else{
      res.redirect("/user/sign_in");
    }
  });

  server.use("/setup",async ( req, res, nextR) => {
    let access_token = req.cookies.access_token;
    if(access_token){
      try {
        let is_valid = await verifyToken(access_token);
        req.user = is_valid.payload;
        if(is_valid.payload.type === "setup"){
          nextR();
        }else{
          res.redirect("/profile");
        }
      }catch(err){
        res.redirect("/user/sign_in");
      }
    }else{
      res.redirect("/user/sign_in");
    }

  });

  server.use("/api/room",async ( req, res, nextR) => {
    var access_token = req.headers.authorization || req.cookies.access_token;
    if(access_token){
      try {
        var is_valid = await verifyToken(access_token);
        req.user = is_valid.payload;
        nextR();
      }catch(err){
        res.redirect("/user/sign_in");
      }
    }else{
      res.redirect("/user/sign_in");
    }
  });

  server.use("/room",async ( req, res, nextR) => {
    let access_token = req.headers.authorization || req.cookies.access_token;
    if(access_token){
      try {
        let is_valid = await verifyToken(access_token);
        req.user = is_valid.payload;
        nextR();
      }catch(err){
        res.redirect("/user/sign_in");
      }
    }else{
      res.redirect("/user/sign_in");
    }
  });

  server.use('/',async ( req, res, next_handler) => {
    let protected_paths = ['/my_profile','/profile','/explore','/settings','/room/create','/api/explore'];
    if(protected_paths.includes(req.path)){
      let access_token = req.headers.authorization || req.cookies.access_token;
      if(access_token){
        try {
          let is_valid = await verifyToken(access_token);
          req.user = is_valid.payload;
          next_handler();
        }catch(err){
          res.redirect("/user/sign_in");
        }
      }else{
        res.redirect("/user/sign_in");
      }
    }else{
      next_handler();
    }
  });

  server.post("*/*", ( req, res, next) => {
    return handle( req, res);
  });

  server.get("*/*", ( req, res, next) => {
    return handle( req, res);
  });

  http_server.listen(port, () => {
    console.log("Server is up runing on port:", port);
  })
  
  /*
  if(process.env.NODE_ENV == 'development'){
    server.on("upgrade",( request, socket, head) => {
      ws.handleUpgrade( request, socket, head, socket => {
        ws.emit("connection", socket, request);
      });
    });
  }
  */
});
