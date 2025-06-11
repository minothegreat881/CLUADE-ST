// Fixed admin.js for Strapi Cloud connection
const BASE_URL = 'https://integral-action-7f417e6ef6.strapiapp.com/api';

async function createPost(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content') ? document.getElementById('content').value : '';
    
    if (!title.trim()) {
        alert('Title is required!');
        return;
    }
    
    try {
        console.log('Creating post:', { title, content });
        
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
            console.error('Error response:', errorData);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const result = await response.json();
        console.log('Post created:', result);
        
        // Clear form
        document.getElementById('title').value = '';
        if (document.getElementById('content')) {
            document.getElementById('content').value = '';
        }
        
        // Show success message
        showMessage('Post created successfully!', 'green');
        
        // Load updated posts list
        loadPosts();
        
    } catch (error) {
        console.error('Error creating post:', error);
        showMessage(`Error: ${error.message}`, 'red');
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
        if (document.getElementById('postsList')) {
            document.getElementById('postsList').innerHTML = 
                '<p style="color: red;">Error loading posts list</p>';
        }
    }
}

function displayPostsList(posts) {
    const postsListContainer = document.getElementById('postsList');
    
    if (!postsListContainer) return;
    
    if (!posts || posts.length === 0) {
        postsListContainer.innerHTML = '<p>No posts yet.</p>';
        return;
    }
    
    postsListContainer.innerHTML = `
        <h3>Existing Posts:</h3>
        <ul>
            ${posts.map(post => {
                const title = post.title || (post.attributes && post.attributes.title) || 'No title';
                const publishedAt = post.publishedAt || (post.attributes && post.attributes.publishedAt) || new Date().toISOString();
                
                return `
                    <li>
                        <strong>${title}</strong> 
                        <small>(${new Date(publishedAt).toLocaleDateString()})</small>
                    </li>
                `;
            }).join('')}
        </ul>
    `;
}

function showMessage(message, color) {
    let messageDiv = document.getElementById('message');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        document.querySelector('main').appendChild(messageDiv);
    }
    messageDiv.innerHTML = `<p style="color: ${color};">${message}</p>`;
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
    // Handle both old form ID and new form ID
    const form = document.getElementById('postForm') || document.getElementById('create-form');
    if (form) {
        form.addEventListener('submit', createPost);
        loadPosts(); // Load existing posts when page loads
    }
});