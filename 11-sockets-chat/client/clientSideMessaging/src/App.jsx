import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  Stack,
  Divider,
} from "@mui/material";

function App() {
  const socketRef = useRef(null);

  const [socketID, setSocketID] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  const [myRooms, setMyRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [createRoomID, setCreateRoomID] = useState("");
  const [joinRoomID, setJoinRoomID] = useState("");

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      setSocketID(socketRef.current.id);
    });

    socketRef.current.on("public-message", (msg) => {
      setMessages((prev) => [
        ...prev,
        { type: "public", text: msg.text },
      ]);
    });

    socketRef.current.on("private-message", (msg) => {
      setMessages((prev) => [
        ...prev,
        { type: "private", text: msg.text, room: msg.room },
      ]);
    });

    socketRef.current.on("room-created", (roomID) => {
      setMyRooms((prev) => [...prev, roomID]);
    });

    socketRef.current.on("room-joined", (roomID) => {
      setMyRooms((prev) => [...prev, roomID]);
    });

    socketRef.current.on("room-error", (err) => {
      alert(err);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const sendMessage = () => {
    console.log("sendMessageFired", activeRoom)
    console.log(messageText)
    if (!messageText) return;

    socketRef.current.emit("send-message", {
      roomID: activeRoom, // null → public
      messageText,
    });

    setMessageText("");
  };

  const createRoom = () => {
    if (!createRoomID) return;
    socketRef.current.emit("create-room", createRoomID);
    setCreateRoomID("");
  };

  const joinRoom = () => {
    if (!joinRoomID) return;
    socketRef.current.emit("join-room", joinRoomID);
    setJoinRoomID("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5">🟢 Socket Chat</Typography>
        <Typography variant="caption">
          Socket ID: {socketID}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">My Rooms</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {myRooms.map((room) => (
              <Button
                key={room}
                size="small"
                variant={activeRoom === room ? "contained" : "outlined"}
                onClick={() => setActiveRoom(room)}
              >
                {room}
              </Button>
            ))}
            <Button
              size="small"
              variant={activeRoom === null ? "contained" : "outlined"}
              onClick={() => setActiveRoom(null)}
            >
              Public
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            height: 250,
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
            p: 2,
            borderRadius: 2,
            mb: 2,
          }}
        >
          <Stack spacing={1}>
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  alignSelf: msg.type === "private" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.type === "private" ? "#c8e6c9" : "#e3f2fd",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2">
                  {msg.type === "private" ? "🔒 " : "🌍 "}
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <TextField
          fullWidth
          label="Message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button fullWidth variant="contained" onClick={sendMessage} sx={{ mb: 2 }}>
          Send Message
        </Button>

        <Divider sx={{ my: 2 }} />

        <TextField
          fullWidth
          label="Create Room"
          value={createRoomID}
          onChange={(e) => setCreateRoomID(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button fullWidth variant="outlined" onClick={createRoom} sx={{ mb: 2 }}>
          Create Room
        </Button>

        <TextField
          fullWidth
          label="Join Room"
          value={joinRoomID}
          onChange={(e) => setJoinRoomID(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button fullWidth variant="outlined" onClick={joinRoom}>
          Join Room
        </Button>
      </Paper>
    </Container>
  );
}

export default App;
