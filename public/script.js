const socket = io(); // Connect to WebSocket server

document.getElementById('joinGame').addEventListener('click', () => {
    document.getElementById('gamePopup').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('gamePopup').style.display = 'none';
});

// Handle creating a new game
document.getElementById('createNew').addEventListener('click', () => {
    socket.emit('createGame');
});

// Listen for game creation event from the server
socket.on('gameCreated', (data) => {
    // Display game code in the top right
    const gameCodeBox = document.getElementById('gameCodeDisplay');
    gameCodeBox.innerText = `Game Code: ${data.gameCode}`;
    gameCodeBox.style.display = 'block';

    // Show notification
    const notification = document.getElementById('notification');
    notification.innerText = "New game created!";
    notification.style.display = 'block';

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);

    // Close popup
    document.getElementById('gamePopup').style.display = 'none';
});
