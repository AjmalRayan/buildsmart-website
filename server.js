const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Create an instance of Express
const app = express();

// Set up middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (adjust path if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Create a POST route to handle form submissions
app.post('/send-email', async (req, res) => {
    console.log("Received data:", req.body); // Log the received form data to the console
    const { name, mobile, email, siteLocation, city, message, location } = req.body;

    // Determine email subject and content
    let subject;
    let content;

    if (siteLocation && city) {
        // Home Page Enquiry Form
        subject = "New Enquiry from Website";
        content = `
            <h2>New Enquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mobile Number:</strong> ${mobile}</p>
            <p><strong>Email ID:</strong> ${email}</p>
            <p><strong>Site Location:</strong> ${siteLocation}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;
    } else {
        // Construction Packages Form
        subject = "New Enquiry - Construction Packages";
        content = `
            <h2>New Enquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mobile Number:</strong> ${mobile}</p>
            <p><strong>Email ID:</strong> ${email}</p>
            <p><strong>Location:</strong> ${location}</p>
        `;
    }

    // Set up Nodemailer transporter (Using Environment Variables)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'process.env.EMAIL_USER', // Your email from .env file
            pass: 'process.env.EMAIL_PASS'  // App password from .env file
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'ajmalak016@gmail.com',  
        to: "anajmalkhan2020@gmail.com",  // Your recipient email
        subject: subject,
        html: content
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email.", error: error.toString() });
    }
});

// Start the server
const PORT = process.env.PORT || 6003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
