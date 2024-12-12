import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  try {
    // Fetch the environment variables from the environment (Vercel or local dev environment)
    const username = process.env.TENNIS_CENTER_USERNAME;
    const password = process.env.TENNIS_CENTER_PASSWORD;
    const loginUrl = process.env.TENNIS_CENTER_URL;

    if (!username || !password || !loginUrl) {
      return res.status(500).json({ error: 'Missing environment variables for login' });
    }

    // Launch a headless browser using Puppeteer
    const browser = await puppeteer.launch({ headless: true });

    // Open a new page in the browser
    const page = await browser.newPage();

    // Navigate to the tennis center's login page
    await page.goto(loginUrl);

    // Fill in the login form with the username and password
    await page.type('#username', username);  // Replace with actual input selector for username
    await page.type('#password', password);  // Replace with actual input selector for password

    // Submit the login form
    await Promise.all([
      page.click('#loginButton'),  // Replace with actual login button selector
      page.waitForNavigation(),
    ]);

    // Check if login was successful
    const loginSuccess = await page.evaluate(() => {
      return document.querySelector('.welcome-message') !== null;  // Example selector for welcome message
    });

    if (!loginSuccess) {
      return res.status(401).json({ error: 'Login failed. Please check your credentials.' });
    }

    // After successful login, navigate to the booking page (adjust URL as needed)
    await page.goto('https://example-tennis-center.com/booking');  // Replace with actual booking page URL

    // Select available time slots and book one (adjust the selector as needed)
    await page.click('.available-time-slot');  // Example selector for available time slots

    // Confirm the booking (replace with actual confirm button selector)
    await page.click('#confirm-booking');  // Replace with actual confirm booking button

    // Wait for the confirmation page to appear
    await page.waitForSelector('.confirmation-message');  // Replace with actual confirmation selector

    // Grab the confirmation message from the page
    const confirmationMessage = await page.evaluate(() => {
      return document.querySelector('.confirmation-message').innerText;
    });

    // Close the browser
    await browser.close();

    // Respond with the confirmation message
    res.status(200).json({ message: confirmationMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
