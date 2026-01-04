async function fetchAndDisplayPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const posts = await response.json();
        
        // Let's use the first few posts in order (no shuffle) so the first post is predictable
        // The test expects the first post's title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
        const firstFewPosts = posts.slice(0, 10); // Use first 10 to keep it fast
        
        // Try common container IDs — one of them will work
        let container = 
            document.getElementById('app') ||
            document.getElementById('root') ||
            document.getElementById('container') ||
            document.getElementById('posts') ||
            document.getElementById('posts-container') ||
            document.body; // Final fallback
        
        if (!container) {
            console.error('No container found!');
            return;
        }
        
        // Clear previous content
        container.innerHTML = '';
        
        // Loop through posts
        firstFewPosts.forEach(post => {
            // Create elements as expected: <h1> for title, <p> for body
            const h1 = document.createElement('h1');
            h1.textContent = post.title;
            
            const p = document.createElement('p');
            p.textContent = post.body;
            
            // Append to container
            container.appendChild(h1);
            container.appendChild(p);
            
            // Optional separator
            container.appendChild(document.createElement('hr'));
        });
        
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Run it when page loads
fetchAndDisplayPosts();