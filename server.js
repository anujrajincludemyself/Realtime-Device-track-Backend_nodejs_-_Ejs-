const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("send-location", (data) => {
    io.emit("received", {
      id: socket.id,
      latitude: data.latitude,
      longitude: data.longitude
    });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnect", socket.id);
    console.log("Client disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
