document.getElementById('menuToggle').addEventListener('click', function(e) {
  var sidebar = document.getElementById('sidebar');
  
  // Toggle the sidebar
  if (sidebar.style.left === '-200px' || sidebar.style.left === '') {
      sidebar.style.left = '0';
  } else {
      sidebar.style.left = '-200px';
  }

  // Stop the click event from propagating to the document
  e.stopPropagation();
});

// Close the menu when clicking outside
document.addEventListener('click', function(e) {
  var sidebar = document.getElementById('sidebar');
  var menuToggle = document.getElementById('menuToggle');

  // If the clicked element is not part of the sidebar or the hamburger icon, close the sidebar
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.style.left = '-200px';
  }
});

// Prevent clicks inside the sidebar from closing it
document.getElementById('sidebar').addEventListener('click', function(e) {
  e.stopPropagation();
});


// Handle click to show or hide icons with animation
document.querySelector('.share-btn').addEventListener('click', function() {
  const socialIcons = document.querySelector('.social-icons');
  socialIcons.classList.toggle('show'); // Toggle the 'show' class
});



