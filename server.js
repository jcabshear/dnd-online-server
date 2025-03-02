// Import dependencies
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Simple endpoint to check if server is running
app.get('/', (req, res) => {
  res.send('DND Server is running');
});

// WebSocket logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinGame', (data) => {
    console.log(`${data.playerName} joined the game.`);
    io.emit('playerJoined', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
