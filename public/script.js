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
        alert(`Joining game with code: ${gameCode} (Feature coming soon!)`);
        document.getElementById('gamePopup').style.display = 'none';
    } else {
        alert('Please enter a valid game code.');
    }
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
});
