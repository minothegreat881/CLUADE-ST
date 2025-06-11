// Updated app.js for local Strapi connection
const BASE_URL = 'https://integral-action-7f417e6ef6.strapiapp.com/api';


async function fetchPosts() {
    try {
        const response = await fetch(`${BASE_URL}/posts?populate=*`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displayPosts(data.data);
    } catch (error) {
        console.error('Error fetching posts:', error);
        document.getElementById('data').innerHTML = 
            '<p style="color: red;">Error loading posts. Make sure Strapi is running on localhost:1337</p>';
    }
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('data');
    
    if (!posts || posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts found. Create some posts in the admin panel!</p>';
        return;
    }
    
    postsContainer.innerHTML = posts.map(post => {
        const attributes = post.attributes;
        return `
            <div class="post">
                <h3>${attributes.title}</h3>
                <div class="content">${attributes.content || 'No content'}</div>
                <small>Published: ${new Date(attributes.publishedAt).toLocaleDateString()}</small>
            </div>
        `;
    }).join('');
}

// Load posts when page loads
document.addEventListener('DOMContentLoaded', fetchPosts);