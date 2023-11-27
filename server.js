import express from "express";
import path from "path";
import jsonServer from "json-server";

const server = express();
const jsonServerRouter = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, "dist")));

server.use(middlewares);
server.use("/api", jsonServerRouter);

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
