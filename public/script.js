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

// Handle creating a new game (fixing the broken button)
document.getElementById('createNew').addEventListener('click', async () => {
    try {
        // Send a request to create a game
        const response = await fetch('/create-game', { method: 'POST' });
        const data = await response.json();

        // Emit the event via WebSocket so others can see it too
        socket.emit('createGame', data.gameCode);
    } catch (error) {
        console.error('Error creating game:', error);
    }
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
