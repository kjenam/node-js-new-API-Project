const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { asyncWrapProviders } = require("async_hooks");

const app = express();
const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// app.use(cors({
//     origin:"*",
//     methods: ['GET', 'POST'],
//     credentials: true
//   }))

const roomSet = new set();
const roomUsers = new Map()

app.get("/", (req, res) => {
  res.send("HAIIII");
});

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  socket.on("message", (data) => {
    console.log(data);
    io.emit("public-message", data);
  });


  socket.on("private-message", ({ room, messageText }) => {
    console.log({ room, messageText });
    io.to(room).emit("private-message", messageText);
  });

  socket.on("create-room", (roomID) => {
    if (!roomID || roomSet.has(roomID)) {
      console.log(
        "room with the same ID already exists, please try a new roomID"
      );
      return;
    }
    roomParticipants.add(socket.id)    
  })

    socket.on("join-room", (roomID) => {
      if (!roomID || !roomSet.has(roomID)) {
        console.log(
          "room with this ID Does not exist, please try with a valid ID"
        );
        return;
      }

      roomParticipants.add(socket.id)


    });

    socket.join(roomID);
    console.log(`${socket.id} joined room ${roomID}`);
    io.emit("public-message", "I JOINED a room bitch");
  });

  socket.on("disconnect", (reason) => {
    console.log("user disconnected:", socket.id, "reason:", reason);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
