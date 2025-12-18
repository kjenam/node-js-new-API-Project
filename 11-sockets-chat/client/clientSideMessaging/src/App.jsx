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

  const [messageText, setMessageText] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [messages, setMessages] = useState([]);
  const [privateRoomID, setPrivateRoomID] = useState("");
  const [myRooms, setMyRooms] = useState([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      setSocketID(socketRef.current.id);
    });

    socketRef.current.on("public-message", (msg) => {
      setMessages((prev) => [...prev, { type: "public", text: msg }]);
    });

    socketRef.current.on("private-message", (msg) => {
      setMessages((prev) => [...prev, { type: "private", text: msg }]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const sendPublic = () => {
    if (!messageText) return;
    socketRef.current.emit("message", messageText);
    setMessageText("");
  };

  const sendPrivate = () => {
    if (!messageText || !room) return;
    socketRef.current.emit("private-message", {
      room,
      messageText,
    });
    setMessageText("");
  };

  const createRoom = (roomID) => {
    if (!roomID) return;
    socketRef.current.emit("create-room", roomID);
  };

  const joinRoom = (roomID) => {
    if (!roomID) return;
    setMyRooms((prev) => [...prev, roomID]);
    socketRef.current.emit("join-room", roomID);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          🟢 Socket Chat
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Socket ID: {socketID}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            height: 300,
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
                  maxWidth: "75%",
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

        <TextField
          fullWidth
          label="createRoom"
          value={privateRoomID}
          onChange={(e) => setPrivateRoomID(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Room (for private messages)"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Stack direction="row" spacing={2}>
          <Button fullWidth variant="contained" onClick={sendPublic}>
            Send Public
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={sendPrivate}
          >
            Send Private
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={createRoom}
          >
            createRoom
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
