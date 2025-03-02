document.getElementById('joinGame').addEventListener('click', () => {
    document.getElementById('gamePopup').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('gamePopup').style.display = 'none';
});

// Handle creating a new game
document.getElementById('createNew').addEventListener('click', async () => {
    const response = await fetch('/create-game', { method: 'POST' });
    const data = await response.json();
    
    const popup = document.getElementById('gamePopup');
    popup.innerHTML = `
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
        popup.style.display = 'none';
    });
});
