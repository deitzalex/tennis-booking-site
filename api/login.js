export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
const params = new URLSearchParams();
params.append('username', username);
params.append('password', password);

  }

  try {
    // Replace this URL with the URL of the tennis center login page
    const loginUrl = process.env.TENNIS_LOGIN_URL; 

const loginResponse = await fetch(loginUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: params
});

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    // Respond with user info or success message
    res.status(200).json({ 
      message: 'Login successful', 
      username: loginData.username 
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Something went wrong', 
      error: error.message 
    });
  }
}

