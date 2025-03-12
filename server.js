const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path"); // ✅ Required for serving files
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static frontend files (ALL HTML, CSS, JS files inside 'public' folder)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Handle homepage request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Handle other pages dynamically
app.get("/:page", (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, "public", `${page}.html`);

    // Check if the file exists before serving
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send("Page not found"); // Handle 404 errors
        }
    });
});

// 📨 Handle form submission via email
app.post("/send-email", async (req, res) => {
    const { formType, name, mobile, email, siteLocation, city, message, location, } = req.body;

    if (!name || !mobile || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let subject, emailContent;
        if (formType === "enquireForm") {
            subject = "New Enquiry Received";
            emailContent = `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\nSite Location: ${siteLocation}\nCity: ${city}\nMessage: ${message}`;
        } else if (formType === "constructionForm") {
            subject = "New Construction Package Inquiry";
            emailContent = `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\nLocation: ${location}`;
        } else {
            return res.status(400).json({ error: "Invalid form type" });
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "anajmalkhan2020@gmail.com",
            subject,
            text: emailContent
        });

        res.json({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
