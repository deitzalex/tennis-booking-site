export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const loginUrl = process.env.TENNIS_LOGIN_URL;

    if (!loginUrl) {
      throw new Error('Missing TENNIS_LOGIN_URL environment variable.');
    }

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const loginResponse = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!loginResponse.ok) {
      const errorResponse = await loginResponse.json();
      return res.status(loginResponse.status).json({ 
        message: 'Failed to log in to tennis center', 
        error: errorResponse 
      });
    }

    const loginData = await loginResponse.json();
    res.status(200).json({ 
      message: 'Login successful', 
      username: loginData.username 
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'An unexpected error occurred', 
      error: error.message 
    });
  }
}
