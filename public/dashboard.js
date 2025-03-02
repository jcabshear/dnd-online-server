document.addEventListener('DOMContentLoaded', () => {
    const gameCode = localStorage.getItem('gameCode');
    if (gameCode) {
        document.getElementById('gameCodeDisplay').innerText = `Game Code: ${gameCode}`;
    }

    // Tab switching logic
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Leave game logic
    document.getElementById('leaveGame').addEventListener('click', () => {
        if (confirm('Are you sure you want to leave the game?')) {
            window.location.href = '/';
        }
    });
});
