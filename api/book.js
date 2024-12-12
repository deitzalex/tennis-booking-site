export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { bookingDate, bookingTime } = req.body;

  if (!bookingDate || !bookingTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Log in to the tennis website
    const loginResponse = await fetch(`${process.env.TENNIS_API_URL}/login`, {
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

    const token = loginData.token; 

    // Send a request to book the court
    const bookingResponse = await fetch(`${process.env.TENNIS_API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
