document.addEventListener('DOMContentLoaded', () => {
    const gameCode = localStorage.getItem('gameCode');
    if (gameCode) {
        document.getElementById('gameCodeDisplay').innerText = `Game Code: ${gameCode}`;
    }

    // Function to load tab content
    function loadTab(tab) {
        fetch(`tabs/${tab}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('tab-content').innerHTML = data;
            })
            .catch(error => console.error('Error loading tab:', error));
    }

    // Tab switching logic
    const tabs = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadTab(tab.dataset.tab);
        });
    });

    // Load default tab on page load
    loadTab('character');

    // Leave game logic
    document.getElementById('leaveGame').addEventListener('click', () => {
        if (confirm('Are you sure you want to leave the game?')) {
            window.location.href = '/';
        }
    });
});
