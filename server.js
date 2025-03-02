import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';

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

// Serve static files from the "public" folder
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Temporary storage for active games
const games = {}; 

// Create a new game and generate a unique game code
app.post('/create-game', (req, res) => {
    const gameCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    games[gameCode] = { players: [], createdAt: new Date() };
    res.json({ gameCode });
});

// WebSocket logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Handle creating a game
  socket.on('createGame', () => {
    const gameCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    games[gameCode] = { players: [], createdAt: new Date() };
    socket.emit('gameCreated', { gameCode });
  });

  // Handle joining a game
  socket.on('joinGame', ({ gameCode }) => {
    if (games[gameCode]) {
      games[gameCode].players.push(socket.id);
      socket.emit('joinSuccess', { gameCode, message: "Successfully joined the game!" });
      console.log(`User ${socket.id} joined game ${gameCode}`);
    } else {
      socket.emit('joinError', { message: "Game code not found. Please try again." });
    }
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
