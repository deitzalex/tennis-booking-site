// User clicks 'Login' button
document.getElementById('login-button').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  if (username) {
    alert(`Welcome, ${username}!`);
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('booking-section').style.display = 'block';
  } else {
    alert('Please enter your Tennis Court login.');
  }
});

// User submits a booking request
document.getElementById('book-now').addEventListener('click', () => {
  const date = document.getElementById('booking-date').value;
  const time = document.getElementById('booking-time').value;

  if (date && time) {
    alert(`Requesting a booking for ${date} at ${time}...`);
  } else {
    alert('Please select a date and time for your booking.');
  }
});

