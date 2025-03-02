const socket = io(); // Connect to WebSocket server

// Show the popup when clicking "Join Existing Game"
document.getElementById('joinExisting').addEventListener('click', () => {
    document.getElementById('gamePopup').style.display = 'block';
});

// Close the popup when clicking "Cancel"
document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('gamePopup').style.display = 'none';
});

// Handle joining an existing game
document.getElementById('submitGameCode').addEventListener('click', () => {
    const gameCode = document.getElementById('gameCodeInput').value.trim();
    if (gameCode) {
        socket.emit('joinGame', { gameCode });
    } else {
        alert('Please enter a valid game code.');
    }
});

// Handle creating a new game
document.getElementById('createNew').addEventListener('click', async () => {
    try {
        const response = await fetch('/create-game', { method: 'POST' });
        const data = await response.json();
        socket.emit('createGame', data.gameCode);
    } catch (error) {
        console.error('Error creating game:', error);
    }
});

// Listen for game creation event from the server
socket.on('gameCreated', (data) => {
    localStorage.setItem('gameCode', data.gameCode);
    window.location.href = '/dashboard';
});

// Listen for successful game join
socket.on('joinSuccess', (data) => {
    localStorage.setItem('gameCode', data.gameCode);
    window.location.href = '/dashboard';
});

// Listen for failed game join
socket.on('joinError', (data) => {
    alert(data.message);
});
