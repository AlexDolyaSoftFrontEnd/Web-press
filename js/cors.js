const button = document.querySelector('.get-data');
const area = document.querySelector('.area');

button.addEventListener('click', loadUsers);

async function loadUsers() {
	// Блокуємо кнопку, щоб уникнути повторних кліків
	button.disabled = true;
	area.textContent = 'Завантаження...';

	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/users'
		);

		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}

		const users = await response.json();

		// Очищаємо область
		area.textContent = '';

		const fragment = document.createDocumentFragment();

		users.forEach(user => {
			const p = document.createElement('p');
			p.textContent = `${user.name} (${user.email})`;
			fragment.appendChild(p);
		});

		area.appendChild(fragment);
	} catch (error) {
		area.textContent = `Помилка завантаження: ${error.message}`;
	} finally {
		button.disabled = false;
	}
}
