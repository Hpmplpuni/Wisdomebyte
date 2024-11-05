// Sample data for demonstration purposes
const users = [
  { username: 'JohnDoe', email: 'john@example.com', status: 'Active' },
  { username: 'JaneDoe', email: 'jane@example.com', status: 'Inactive' },
  { username: 'JimBeam', email: 'jim@example.com', status: 'Active' },
];

// Function to render user list
function renderUserList() {
  const userList = document.getElementById('user-list');
  users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.status}</td>
          <td><button onclick="removeUser('${user.username}')">Remove</button></td>
      `;
      userList.appendChild(row);
  });
}

// Function to remove a user
function removeUser(username) {
  const userIndex = users.findIndex(user => user.username === username);
  if (userIndex > -1) {
      users.splice(userIndex, 1);
      document.getElementById('user-list').innerHTML = ''; // Clear current user list
      renderUserList(); // Re-render user list
  }
}

// Function to render statistics
function renderStatistics() {
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const inactiveUsers = users.filter(user => user.status === 'Inactive').length;

  document.getElementById('total-users').innerText = totalUsers;
  document.getElementById('active-users').innerText = activeUsers;
  document.getElementById('inactive-users').innerText = inactiveUsers;
}

// Function to render recent activity
function renderRecentActivity() {
  const activityLog = document.getElementById('activity-log');
  const activities = [
      { user: 'JohnDoe', action: 'Logged in', date: '2024-10-20' },
      { user: 'JaneDoe', action: 'Signed up', date: '2024-10-21' },
      { user: 'JimBeam', action: 'Logged out', date: '2024-10-22' },
  ];

  activities.forEach(activity => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${activity.user}</td>
          <td>${activity.action}</td>
          <td>${activity.date}</td>
      `;
      activityLog.appendChild(row);
  });
}

// Initial render
renderUserList();
renderStatistics();
renderRecentActivity();
