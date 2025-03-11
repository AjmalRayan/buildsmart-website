const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// POST route to handle form submissions
app.post("/send-email", async (req, res) => {
    const { formType, name, mobile, email, siteLocation, city, message, location } = req.body;

    // Validate data (ensure required fields are present)
    if (!name || !mobile || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Create transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS  // App password (if using Gmail)
            }
        });

        // Set email subject and content based on form type
        let subject = "";
        let emailContent = "";

        if (formType === "enquireForm") {
            subject = "New Enquiry Received";
            emailContent = `
                You have received a new enquiry:
                --------------------------------
                Name: ${name}
                Mobile: ${mobile}
                Email: ${email}
                Site Location: ${siteLocation}
                City: ${city}
                Message: ${message}
            `;
        } else if (formType === "constructionForm") {
            subject = "New Construction Package Inquiry";
            emailContent = `
                You have received a new construction package inquiry:
                ------------------------------------------------------
                Name: ${name}
                Mobile: ${mobile}
                Email: ${email}
                Location: ${location}
            `;
        } else {
            return res.status(400).json({ error: "Invalid form type" });
        }

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "anajmalkhan2020@gmail.com", // Replace with your actual email
            subject: subject,
            text: emailContent
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

// Start the server
const PORT = process.env.PORT || 6011;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
