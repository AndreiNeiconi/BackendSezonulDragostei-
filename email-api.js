require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer with Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465, // SSL port
  secure: true, // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint to receive form submissions
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const mailOptions = {
    from: `"Website Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // send to yourself
    subject: "New Contact Form Submission",
    text: `You have a new form submission from your website:

Name: ${name}
Email: ${email}
Message: ${message}
`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.json({ message: "Form submitted and email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Error sending email", error: err });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
