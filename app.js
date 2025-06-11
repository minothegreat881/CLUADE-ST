// Fixed app.js for Strapi Cloud connection
const BASE_URL = 'https://integral-action-7f417e6ef6.strapiapp.com/api';

async function fetchPosts() {
    try {
        console.log('Fetching posts from:', `${BASE_URL}/posts?populate=*`);
        const response = await fetch(`${BASE_URL}/posts?populate=*`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw API response:', data);
        displayPosts(data.data);
    } catch (error) {
        console.error('Error fetching posts:', error);
        document.getElementById('data').innerHTML = 
            '<p style="color: red;">Error loading posts. Check console for details.</p>';
    }
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('data');
    
    console.log('Posts to display:', posts);
    
    if (!posts || posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts found. Create some posts in the admin panel!</p>';
        return;
    }
    
    postsContainer.innerHTML = posts.map(post => {
        console.log('Processing post:', post);
        
        // Handle both Strapi v4 and v5 data structures
        const title = post.title || (post.attributes && post.attributes.title) || 'No title';
        const content = post.content || (post.attributes && post.attributes.content) || 'No content';
        const publishedAt = post.publishedAt || (post.attributes && post.attributes.publishedAt) || new Date().toISOString();
        
        return `
            <div class="post">
                <h3>${title}</h3>
                <div class="content">${content}</div>
                <small>Published: ${new Date(publishedAt).toLocaleDateString()}</small>
            </div>
        `;
    }).join('');
}

// Load posts when page loads
document.addEventListener('DOMContentLoaded', fetchPosts);