import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({ headless: true });

    // Open a new page
    const page = await browser.newPage();

    // Go to the tennis center's login page (replace with actual URL)
    await page.goto('https://example-tennis-center.com/login');

    // Fill in the login form with the username and password
    await page.type('#username', req.body.username);  // Replace with actual input selector
    await page.type('#password', req.body.password);  // Replace with actual input selector

    // Submit the login form (replace with actual selector)
    await Promise.all([
      page.click('#loginButton'),
      page.waitForNavigation(),
    ]);

    // Check if login was successful (this is just an example, you should adjust to your case)
    const loginSuccess = await page.evaluate(() => {
      return document.querySelector('.welcome-message') !== null;  // Example selector
    });

    if (!loginSuccess) {
      return res.status(401).json({ error: 'Login failed. Please check your credentials.' });
    }

    // After login, navigate to the booking page (replace with actual URL)
    await page.goto('https://example-tennis-center.com/booking');

    // Select available timeslots and book one (this is just an example, adjust to actual page structure)
    await page.click('.available-time-slot'); // Replace with actual selector for available slots

    // Confirm the booking (replace with actual selector)
    await page.click('#confirm-booking');

    // Wait for the confirmation page
    await page.waitForSelector('.confirmation-message');  // Replace with actual confirmation selector

    // Grab the confirmation message
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
