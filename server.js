import express from "express";
import path from "path";
import jsonServer from "json-server";

const server = express();
const jsonServerRouter = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.REACT_APP_API_URL || 3000;

server.use(middlewares);
server.use("/api", jsonServerRouter);

server.use(express.static(path.join(path.resolve(), "dist")));
server.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
