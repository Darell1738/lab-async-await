// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Get the container (fallback to body if 'post-list' doesn't exist)
    const container = document.getElementById('post-list') || document.body;

    // Initial loading message
    container.innerHTML = '<p>Loading posts...</p>';

    try {
        // Fetch posts
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
            throw new Error('Network error');
        }
        
        const posts = await response.json();
        
        // Use first 10 posts in original order (first post title is "sunt aut facere repellat...")
        const postsToShow = posts.slice(0, 10);
        
        // Clear loading message
        container.innerHTML = '';
        
        // Create and append h1 and p for each post
        postsToShow.forEach(post => {
            const h1 = document.createElement('h1');
            h1.textContent = post.title;
            
            const p = document.createElement('p');
            p.textContent = post.body;
            
            container.appendChild(h1);
            container.appendChild(p);
        });
        
    } catch (error) {
        container.innerHTML = '<p style="color: red;">Error loading posts</p>';
    }
});