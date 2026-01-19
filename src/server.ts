import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import next from 'next';

const dev: boolean = process.env.NODE_ENV !== 'production';
const hostname: string = 'localhost';
const PORT: number = parseInt(process.env.PORT) || 3000;

// [ IMPORTANT ]==================================================================
//      This is a work around to disable next js upgradeHandler for websocket.
//      On Real Production environment this app will use two diffrent servers
//      But since i am just using a free hosting service i need this work around.

import { Server } from 'http';
let stubServer: Server = null;

if (!dev) {
  stubServer = new Server();
  stubServer.on = (eventName: string, callback: (...args: any[]) => void): Server => {
    console.log(`# Next js is trying to register: ${eventName}`);
    callback;
    return stubServer;
  }
}

// [ END_IMPORTANT ]==============================================================

// When using middleware `hostname` and `port` must be provided below
const app: NextServer = next({ dev, hostname, port: PORT, httpServer: stubServer });
const handle: RequestHandler = app.getRequestHandler();

import web_socket_server from './web_socket/index';
import http from 'http';
import router from './routes';
import { NextServer, RequestHandler } from 'next/dist/server/next';

app.prepare().then(() => {
  const server: Express = express();
  const http_server: Server = http.createServer(server);

  web_socket_server(http_server);

  // use a cookie parser
  server.use(cookieParser());

  server.use("/", router);

  server.post("*/*", (req, res) => {
    return handle(req, res);
  });

  server.get("*/*", (req, res) => {
    return handle(req, res);
  });

  server.patch("*/*", (req, res) => {
    return handle(req, res);
  });

  server.delete("*/*", (req, res) => {
    return handle(req, res);
  });

  http_server.listen(PORT, () => {
    console.log(`# Running on ${dev ? "Development" : "Production"}`);
    console.log("Server is up runing on port:", PORT);
  });
});
