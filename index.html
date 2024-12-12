<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tennis Court Login</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <h1>Tennis Court Login</h1>

  <form id="loginForm">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>

    <button type="submit">Log In</button>
  </form>

  <div id="message"></div>

  <script>
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        
        if (response.ok) {
          document.getElementById('message').innerText = `Login successful! Welcome, ${result.username}.`;
        } else {
          document.getElementById('message').innerText = `Error: ${result.message}`;
        }
      } catch (error) {
        document.getElementById('message').innerText = 'An error occurred. Please try again later.';
      }
    });
  </script>

</body>
</html>
