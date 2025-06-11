// Example: create data in Strapi using fetch
const BASE_URL = 'http://localhost:1337/api';

document.getElementById('create-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    try {
        const res = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: { title } })
        });
        const json = await res.json();
        alert('Created item with id ' + json.data.id);
    } catch (err) {
        console.error('Error creating item:', err);
    }
});
