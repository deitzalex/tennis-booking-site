// User clicks 'Request Booking' button
document.getElementById('book-now').addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const date = document.getElementById('booking-date').value;
  const time = document.getElementById('booking-time').value;

  if (!username || !date || !time) {
    alert('Please provide all booking information.');
    return;
  }

  try {
    const response = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        loginUsername: username, 
        bookingDate: date, 
        bookingTime: time 
      })
    });

    const result = await response.json();

    if (response.ok) {
      alert('Booking was successful!');
    } else {
      alert('Booking failed: ' + result.message);
    }
  } catch (error) {
    alert('An error occurred: ' + error.message);
  }
});

