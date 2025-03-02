// Open the popup when clicking "Join the Game"
document.getElementById('joinGame').addEventListener('click', () => {
    document.getElementById('gamePopup').style.display = 'block';
});

// Close the popup when clicking "Cancel"
document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('gamePopup').style.display = 'none';
});

// Placeholder action for joining an existing game
document.getElementById('joinExisting').addEventListener('click', () => {
    alert('Joining an existing game... (Feature coming soon!)');
    document.getElementById('gamePopup').style.display = 'none';
});

// Placeholder action for creating a new game
document.getElementById('createNew').addEventListener('click', () => {
    alert('Creating a new game... (Feature coming soon!)');
    document.getElementById('gamePopup').style.display = 'none';
});
