const socket = io(); // Connect to WebSocket server

const gameCode = localStorage.getItem('gameCode');
if (!gameCode) {
    window.location.href = '/';
} else {
    document.getElementById('gameCodeDisplay').innerText = `Game Code: ${gameCode}`;
    socket.emit('joinGame', { gameCode });
}

socket.on('joinSuccess', (data) => {
    console.log(`Joined game: ${data.gameCode}`);
});

socket.on('joinError', (data) => {
    alert(data.message);
    localStorage.removeItem('gameCode');
    window.location.href = '/';
});

// Leave game button
document.getElementById('leaveGame').addEventListener('click', () => {
    localStorage.removeItem('gameCode');
    window.location.href = '/';
});
