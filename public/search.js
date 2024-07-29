document.addEventListener('DOMContentLoaded', () => {
    let gamesData = [];

    fetch('/games.json')
        .then(response => response.json())
        .then(data => {
            gamesData = data;
        })
        .catch(error => console.error('Error:', error));

    const searchInput = document.getElementById('search');
    const dropdown = document.createElement('div');
    dropdown.classList.add('search-dropdown');
    document.getElementsByClassName("navbar")[0].appendChild(dropdown);

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        dropdown.innerHTML = '';

        if (query) {
            const results = gamesData.filter(game => game.name.toLowerCase().includes(query));
            results.slice(0, 5).forEach(game => {
                const item = document.createElement('div');
                item.classList.add('dropdown-item');
                item.textContent = game.name;
                item.addEventListener('click', () => {
                    window.location.href = `/game/${game.root}`;
                });
                dropdown.appendChild(item);
            });

            if (results.length > 5) {
                const moreItem = document.createElement('div');
                moreItem.classList.add('dropdown-more');
                moreItem.textContent = `+${results.length - 5} more...`;
                dropdown.appendChild(moreItem);
            }
        }

        dropdown.style.display = query ? 'block' : 'none';
    });

    searchInput.addEventListener('focus', () => {
        dropdown.style.display = searchInput.value ? 'block' : 'none';
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            dropdown.style.display = 'none';
        }, 200);
    });
});
