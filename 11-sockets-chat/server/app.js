const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = new Set();
const roomParticipants = new Map();

app.get("/", (req, res) => {
  res.send("HAIIII");
});

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  socket.on("create-room", (roomID) => {
    if (!roomID || rooms.has(roomID)) {
      socket.emit("room-error", "Room already exists");
      return;
    }

    rooms.add(roomID);
    roomParticipants.set(roomID, new Set([socket.id])); 

    console.log(`Room created: ${roomID} by ${socket.id}`);
    socket.emit("room-created", roomID);
  });

  socket.on("join-room", (roomID) => {
    if (!roomID || !rooms.has(roomID)) {
      socket.emit("room-error", "Room does not exist");
      return;
    }

    roomParticipants.get(roomID).add(socket.id);
    console.log(`${socket.id} joined room ${roomID}`);

    socket.emit("room-joined", roomID);
  });

  socket.on("send-message", ({ roomID, messageText }) => {
    if (!messageText) return;

    if (!roomID) {
      io.emit("public-message", {
        from: socket.id,
        text: messageText,
      });
      return;
    }

    console.log("reached here")
    const participants = roomParticipants.get(roomID);
    console.log(participants)
    if (!participants) return;
    if (!participants.has(socket.id)) return;

    for (const participantId of participants) {
      io.to(participantId).emit("private-message", {
        room: roomID,
        from: socket.id,
        text: messageText,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);

    for (const participants of roomParticipants.values()) {
      participants.delete(socket.id);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
