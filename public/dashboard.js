document.addEventListener('DOMContentLoaded', () => {
    function loadTab(tab) {
        fetch(`tabs/${tab}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('tab-content').innerHTML = data;
                if (tab === 'character') initCharacterCreation();
            })
            .catch(error => console.error('Error loading tab:', error));
    }

    function initCharacterCreation() {
        const rollStatsButton = document.getElementById('rollStats');
        const statsDisplay = document.getElementById('statsDisplay');
        const saveCharacterButton = document.getElementById('saveCharacter');

        if (rollStatsButton) {
            rollStatsButton.addEventListener('click', () => {
                const stats = Array.from({ length: 6 }, () => rollDice(4, 6));
                statsDisplay.innerText = `Stats: ${stats.join(', ')}`;
            });
        }

        if (saveCharacterButton) {
            saveCharacterButton.addEventListener('click', () => {
                const character = {
                    name: document.getElementById('characterName').value,
                    race: document.getElementById('race').value,
                    class: document.getElementById('class').value,
                    background: document.getElementById('background').value,
                    equipment: document.getElementById('equipment').value,
                    stats: statsDisplay.innerText.replace('Stats: ', '')
                };

                localStorage.setItem('character', JSON.stringify(character));
                alert('Character saved!');
            });
        }
    }

    function rollDice(numDice, diceSize) {
        let rolls = [];
        for (let i = 0; i < numDice; i++) {
            rolls.push(Math.floor(Math.random() * diceSize) + 1);
        }
        rolls.sort((a, b) => a - b);
        rolls.shift(); // Drop the lowest roll
        return rolls.reduce((sum, val) => sum + val, 0);
    }

    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadTab(tab.dataset.tab);
        });
    });

    loadTab('character');
});
