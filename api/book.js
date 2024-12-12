export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { loginUsername, bookingDate, bookingTime } = req.body;

  // Check if the required info is present
  if (!loginUsername || !bookingDate || !bookingTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Example of sending a login request to the tennis site
    const loginResponse = await fetch('https://tenniscourtwebsite.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        username: loginUsername, 
        password: 'your-password-here' // This is just an example. 
      })
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error('Failed to log in');
    }

    const token = loginData.token; // Example of getting a token from login.

    // Send a request to book the court
    const bookingResponse = await fetch('https://tenniscourtwebsite.com/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token from login
      },
      body: JSON.stringify({
        date: bookingDate,
        time: bookingTime
      })
    });

    const bookingData = await bookingResponse.json();

    if (!bookingResponse.ok) {
      throw new Error('Failed to book the court');
    }

    res.status(200).json({
      message: 'Booking request successful',
      bookingData
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Something went wrong', 
      error: error.message 
    });
  }
}
