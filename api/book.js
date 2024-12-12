export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  // Get user input from the frontend (username, booking date, and time)
  const { bookingDate, bookingTime } = req.body;

  // Check if the required information is present
  if (!bookingDate || !bookingTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // STEP 1: Log in to the tennis website
    const loginUrl = process.env.TENNIS_LOGIN_URL; // Environment variable for login URL
    const loginResponse = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        username: process.env.TENNIS_USERNAME, 
        password: process.env.TENNIS_PASSWORD
      })
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error('Failed to log in');
    }

    const token = loginData.token; // Example: Assume login gives us a token

    // STEP 2: Book the court
    const bookingUrl = process.env.TENNIS_BOOKING_URL; // Environment variable for booking URL
    const bookingResponse = await fetch(bookingUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Pass the token from login as a header
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
