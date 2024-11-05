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


// Scroll-based Animation for the 'Feature Projects' Section
window.addEventListener('scroll', function () {
  const projectsSection = document.querySelector('.projects-section');
  const position = projectsSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight) {
      projectsSection.classList.add('animate-projects');
  }
});

// JavaScript for Applying for Internships (simple click event)
const applyButton = document.querySelector('.btn-apply');
applyButton.addEventListener('click', function () {
  alert('Thank you for your interest! fill the form.');
});

// JavaScript for Client and Trainee Talks (optional, can be enhanced with more features)
const talksGrid = document.querySelector('.talks-grid');

function loadTalks() {
  // Assuming this data comes from the server or an API
  const talks = [
      { name: 'John Doe', feedback: 'This company is fantastic! Highly recommend.' },
      { name: 'Jane Smith', feedback: 'Amazing experience. Professional and friendly team.' }
      // Add more client/trainee talks here as needed
  ];

  talks.forEach(talk => {
      const talkCard = document.createElement('div');
      talkCard.classList.add('talk-card');
      talkCard.innerHTML = `
          <h3>${talk.name}</h3>
          <p>${talk.feedback}</p>
      `;
      talksGrid.appendChild(talkCard);
  });
}

// Call the function to load the talks dynamically when the page loads
window.onload = loadTalks;


// JavaScript to toggle the visibility of social media icons
const shareButton = document.querySelector('.fixed-share-button');
const socialIcons = document.querySelector('.fixed-social-icons');

// Toggle visibility of social icons when share button is clicked
shareButton.addEventListener('click', function() {
    socialIcons.classList.toggle('active'); // Toggle the 'active' class
});

document.querySelector('.share-btn').addEventListener('click', function() {
  const socialIcons = document.querySelector('.social-icons');
  socialIcons.style.display = (socialIcons.style.display === 'block') ? 'none' : 'block';
});