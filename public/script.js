const socket = io(); // Connect to WebSocket server

// Open the game popup when clicking "Join the Game"
document.getElementById('joinGame').addEventListener('click', () => {
    document.getElementById('gamePopup').innerHTML = `
        <h2>Join or Create a Game</h2>
        <button id="joinExisting">Join Existing Game</button>
        <button id="createNew">Create New Game</button>
        <button id="closePopup">Cancel</button>
    `;
    document.getElementById('gamePopup').style.display = 'block';

    // Add event listeners inside popup after setting innerHTML
    document.getElementById('joinExisting').addEventListener('click', () => {
        showJoinGamePopup();
    });

    document.getElementById('createNew').addEventListener('click', () => {
        socket.emit('createGame');
    });

    document.getElementById('closePopup').addEventListener('click', () => {
        document.getElementById('gamePopup').style.display = 'none';
    });
});

// Show input popup for joining a game with a code
function showJoinGamePopup() {
    document.getElementById('gamePopup').innerHTML = `
        <h2>Enter Game Code</h2>
        <input type="text" id="gameCodeInput" placeholder="Enter game code" />
        <button id="submitGameCode">Join Game</button>
        <button id="closePopup">Cancel</button>
    `;
    
    document.getElementById('submitGameCode').addEventListener('click', () => {
        const gameCode = document.getElementById('gameCodeInput').value.trim();
        if (gameCode) {
            alert(`Joining game with code: ${gameCode} (Feature coming soon!)`);
            document.getElementById('gamePopup').style.display = 'none';
        } else {
            alert('Please enter a valid game code.');
        }
    });

    document.getElementById('closePopup').addEventListener('click', () => {
        document.getElementById('gamePopup').style.display = 'none';
    });
}

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

    // Update popup to show the created game code
    document.getElementById('gamePopup').innerHTML = `
        <h2>Game Created!</h2>
        <p>Share this code with others to join: <strong>${data.gameCode}</strong></p>
        <button id="copyCode">Copy Code</button>
        <button id="closePopup">Close</button>
    `;

    // Copy game code to clipboard
    document.getElementById('copyCode').addEventListener('click', () => {
        navigator.clipboard.writeText(data.gameCode);
        alert('Game code copied to clipboard!');
    });

    document.getElementById('closePopup').addEventListener('click', () => {
        document.getElementById('gamePopup').style.display = 'none';
    });
});
