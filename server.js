require('dotenv').config(); // Load .env first
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Handle Both Forms Separately
app.post('/send-email', async (req, res) => {
    console.log("Received data:", req.body); 

    const { name, mobile, email, siteLocation, city, message, location } = req.body;

    let subject, content;

    if (siteLocation && city && message) {  
        // 📌 This is the **Home Page "Enquire Now" Form** (quoteForm)
        subject = "New Enquiry from Website (Enquire Now)";
        content = `<h2>New Enquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mobile Number:</strong> ${mobile}</p>
            <p><strong>Email ID:</strong> ${email}</p>
            <p><strong>Site Location:</strong> ${siteLocation}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Message:</strong> ${message}</p>`;
    } else if (location) {  
        // 📌 This is the **Construction Packages Modal Form** (constructionForm)
        subject = "New Enquiry - Construction Packages";
        content = `<h2>New Enquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mobile Number:</strong> ${mobile}</p>
            <p><strong>Email ID:</strong> ${email}</p>
            <p><strong>Location:</strong> ${location}</p>`;
    } else {
        return res.status(400).json({ message: "Invalid form submission. Missing required fields." });
    }

    // ✅ Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS  
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "anajmalkhan2020@gmail.com",
        subject: subject,
        html: content
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email.", error: error.toString() });
    }
});

// ✅ Start the server
const PORT = process.env.PORT || 6009;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please use a different port.`);
    } else {
        console.error("❌ Server error:", err);
    }
});
