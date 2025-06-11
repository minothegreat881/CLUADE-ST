// Updated admin.js for local Strapi connection
const BASE_URL = 'https://integral-action-7f417e6ef6.strapiapp.com/api';


async function createPost(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    
    if (!title.trim()) {
        alert('Title is required!');
        return;
    }
    
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    title: title,
                    content: content,
                    publishedAt: new Date().toISOString()
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const result = await response.json();
        console.log('Post created:', result);
        
        // Clear form
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        
        // Show success message
        document.getElementById('message').innerHTML = 
            '<p style="color: green;">Post created successfully!</p>';
        
        // Load updated posts list
        loadPosts();
        
    } catch (error) {
        console.error('Error creating post:', error);
        document.getElementById('message').innerHTML = 
            `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

async function loadPosts() {
    try {
        const response = await fetch(`${BASE_URL}/posts?populate=*`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displayPostsList(data.data);
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('postsList').innerHTML = 
            '<p style="color: red;">Error loading posts list</p>';
    }
}

function displayPostsList(posts) {
    const postsListContainer = document.getElementById('postsList');
    
    if (!posts || posts.length === 0) {
        postsListContainer.innerHTML = '<p>No posts yet.</p>';
        return;
    }
    
    postsListContainer.innerHTML = `
        <h3>Existing Posts:</h3>
        <ul>
            ${posts.map(post => `
                <li>
                    <strong>${post.attributes.title}</strong> 
                    <small>(${new Date(post.attributes.publishedAt).toLocaleDateString()})</small>
                </li>
            `).join('')}
        </ul>
    `;
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('postForm');
    if (form) {
        form.addEventListener('submit', createPost);
        loadPosts(); // Load existing posts when page loads
    }
});