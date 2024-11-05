// Sidebar Toggle Functionality
document.getElementById('menuToggle').addEventListener('click', function (e) {
  var sidebar = document.getElementById('sidebar');

  // Toggle the sidebar
  sidebar.style.left = sidebar.style.left === '-200px' || sidebar.style.left === '' ? '0' : '-200px';

  // Stop the click event from propagating to the document
  e.stopPropagation();
});

// Close the menu when clicking outside
document.addEventListener('click', function (e) {
  var sidebar = document.getElementById('sidebar');
  var menuToggle = document.getElementById('menuToggle');

  // If the clicked element is not part of the sidebar or the hamburger icon, close the sidebar
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.style.left = '-200px';
  }
});

// Prevent clicks inside the sidebar from closing it
document.getElementById('sidebar').addEventListener('click', function (e) {
  e.stopPropagation();
});

// Modal Handling
const postModal = document.getElementById('postModal');
const addPostBtn = document.getElementById('addPostBtn');
const closeModal = document.querySelector('.close');

// Open the modal to add a post
addPostBtn.onclick = () => postModal.style.display = 'block';

// Close the modal
closeModal.onclick = () => postModal.style.display = 'none';
window.onclick = (event) => {
  if (event.target === postModal) postModal.style.display = 'none';
};

// Load Blog Posts from Local Storage or initialize if not present
let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [
  {
      title: 'Wisdombyte Info Tech Services',
      content: 'Explore our expertise in web development, data analytics, cloud computing, and digital transformation. Wisdombyte Info Tech is your partner in leveraging technology to boost business success.',
      coverUrl: 'images/sample.jpg',
      likes: 0,
      rating: 0,
      ratingCount: 0,
      likedUsers: [],
      ratedUsers: []
  }
];

// Render Blog Posts
function renderPosts() {
  const blogContainer = document.getElementById('blogContainer');
  blogContainer.innerHTML = '';

  blogPosts.forEach((post, index) => {
      const postElement = document.createElement('div');
      postElement.className = 'blog-post';
      postElement.innerHTML = `
          <img src="${post.coverUrl}" alt="Cover Image">
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <div class="star-rating" data-index="${index}">
              ${Array(5).fill('<span class="star">&#9733;</span>').join('')}
              <span>(${post.ratingCount > 0 ? (post.rating / post.ratingCount).toFixed(1) : '0'})</span>
          </div>
          <button class="like-button" onclick="toggleLike(${index})">
              <span class="like-icon">&#10084;</span> <span id="likeCount${index}">${post.likes}</span> Likes
          </button>
          <button class="remove-post" onclick="removePost(${index})">Remove</button>
      `;
      blogContainer.appendChild(postElement);
  });

  // Attach event listeners for star ratings
  document.querySelectorAll('.star-rating').forEach((ratingDiv) => {
      ratingDiv.addEventListener('click', (e) => handleStarClick(e, ratingDiv));
  });
}

// Add a New Post
document.getElementById('postForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const coverFile = document.getElementById('coverFile').files[0];

  if (title && content && coverFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
          const newPost = {
              title,
              content,
              coverUrl: event.target.result,
              likes: 0,
              rating: 0,
              ratingCount: 0,
              likedUsers: [],
              ratedUsers: []
          };

          blogPosts.push(newPost);
          localStorage.setItem('blogPosts', JSON.stringify(blogPosts)); // Save to localStorage
          renderPosts();
          postModal.style.display = 'none';
          document.getElementById('postForm').reset();
      };
      reader.readAsDataURL(coverFile);
  } else {
      alert("Please fill in all fields and upload a cover image.");
  }
});

// Remove a Post
function removePost(index) {
  blogPosts.splice(index, 1);
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts)); // Update localStorage
  renderPosts();
}

// Handle Star Rating Click
function handleStarClick(event, ratingDiv) {
  const index = parseInt(ratingDiv.dataset.index);
  const stars = Array.from(ratingDiv.children).slice(0, 5);
  const clickedStarIndex = stars.indexOf(event.target);
  if (clickedStarIndex === -1) return;

  const userId = 'user123';  // Placeholder for unique user ID
  if (blogPosts[index].ratedUsers.includes(userId)) {
      alert('You have already rated this post.');
      return;
  }

  blogPosts[index].rating += clickedStarIndex + 1;
  blogPosts[index].ratingCount += 1;
  blogPosts[index].ratedUsers.push(userId);

  stars.forEach((star, i) => {
      star.classList.toggle('selected', i <= clickedStarIndex);
  });
  renderPosts();
}

// Toggle Like Status
function toggleLike(index) {
  const userId = 'user123';  // Placeholder for unique user ID
  if (blogPosts[index].likedUsers.includes(userId)) {
      blogPosts[index].likes -= 1;
      blogPosts[index].likedUsers = blogPosts[index].likedUsers.filter(id => id !== userId);
  } else {
      blogPosts[index].likes += 1;
      blogPosts[index].likedUsers.push(userId);
  }
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts)); // Update localStorage
  renderPosts();
}

// Initial rendering of posts
renderPosts();
