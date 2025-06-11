// Example: fetch data from Strapi public API endpoint
// Update BASE_URL to match your Strapi backend
const BASE_URL = 'http://localhost:1337/api';

document.addEventListener('DOMContentLoaded', () => {
    fetch(`${BASE_URL}/posts`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('data');
            container.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(err => {
            console.error('Error fetching from Strapi:', err);
        });
});
