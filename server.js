const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

// Create an instance of Express
const app = express();

// Set up middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files like your HTML (adjust path if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Create a POST route to handle form submission
app.post('/send', (req, res) => {
    const { name, mobile, email, siteLocation, city, message } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ajmalak016@gmail.com',  // Replace with your Gmail email address
            pass: 'sufg kzcp oswy nubi'      // Replace with your App Password
        }
    });

    // Define the email content
    const mailOptions = {
        from: 'ajmalak016@gmail.com',  // Your Gmail address
        to: 'anajmalkhan2020@gmail.com',  // The recipient email address
        subject: 'New Enquiry from Website',  // The subject of the email
        text: `You have received a new enquiry!\n\n
               Name: ${name}\n
               Mobile: ${mobile}\n
               Email: ${email}\n
               Site Location: ${siteLocation}\n
               City: ${city}\n
               Message: ${message}`
    };

    // Send email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).send('Email sent successfully!');
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
