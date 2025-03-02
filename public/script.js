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

// Listen for successful game join
socket.on('joinSuccess', (data) => {
    alert(`Successfully joined game: ${data.gameCode}`);
    document.getElementById('gamePopup').style.display = 'none';
});

// Listen for failed game join
socket.on('joinError', (data) => {
    alert(data.message);
});
