import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
import cors from "cors";
import path from "path";

import express from "express";
const app = express();
app.use(express.json());
app.use(cors());

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

app.use(express.static(path.join(path.resolve(), "./dist/index.html")));
app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "./dist", "index.html"));
});
