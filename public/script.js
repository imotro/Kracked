document.addEventListener('DOMContentLoaded', () => {
    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            const gameContainer = document.getElementById('gameContainer');
            data.forEach(game => {
                const card = document.createElement('div');
                card.classList.add('game-card');
                card.innerHTML = `
                    <img src="cdn/${game.root}/${game.img}" alt="${game.name}">
                    <h3>${game.name}</h3>
                `;
                card.addEventListener('click', () => {
                    window.location.href = `/game/${game.root}`;
                });
                gameContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
});

