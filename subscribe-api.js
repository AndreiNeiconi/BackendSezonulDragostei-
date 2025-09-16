// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const nodemailer = require("nodemailer");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(cors());

// // Configure multer for file uploads (memory storage)
// const upload = multer({ storage: multer.memoryStorage() });

// // Configure Nodemailer
// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER, // contact@serviciidematrimoniale.ro
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // POST /contact endpoint
// app.post("/subscribe", upload.single("file"), async (req, res) => {
//   try {
//     const { name, surname, email, phone, sex, age, job, location, details } =
//       req.body;
//     const file = req.file;

//     let attachments = [];
//     if (file) {
//       attachments.push({
//         filename: file.originalname,
//         content: file.buffer,
//       });
//     }

//     const mailOptions = {
//       from: `"Website Form" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: "New Contact Form Submission",
//       text: `
// New form submission:

// Name: ${name} ${surname}
// Email: ${email}
// Phone: ${phone}
// Sex: ${sex}
// Age: ${age}
// Job: ${job}
// Location: ${location}
// Details: ${details}
// `,
//       attachments: attachments,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);

//     res.json({ message: "Form submitted and email sent successfully!" });
//   } catch (err) {
//     console.error("Error sending email:", err);
//     res.status(500).json({ message: "Error sending form", error: err });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 6060;

// Middleware
// app.use(
//   cors({
//     origin: [
//       "https://serviciidematrimoniale.ro",
//       "https://www.serviciidematrimoniale.ro",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: [
      "https://serviciidematrimoniale.ro",
      "https://www.serviciidematrimoniale.ro",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// Configure multer for file uploads (memory storage)
const upload = multer({ storage: multer.memoryStorage() });

// Configure Nodemailer with Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465, // SSL port
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ===== /contact endpoint (simple contact form) =====
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const mailOptions = {
    from: `"Website Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
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

// ===== /subscribe endpoint (form with file upload) =====
app.post("/api/subscribe", upload.single("file"), async (req, res) => {
  try {
    const { name, surname, email, phone, sex, age, job, location, details } =
      req.body;
    const file = req.file;

    let attachments = [];
    if (file) {
      attachments.push({
        filename: file.originalname,
        content: file.buffer,
      });
    }

    const mailOptions = {
      from: `"Website Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Subscription Form Submission",
      text: `
New form submission:

Name: ${name} ${surname}
Email: ${email}
Phone: ${phone}
Sex: ${sex}
Age: ${age}
Job: ${job}
Location: ${location}
Details: ${details}
`,
      attachments: attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.json({ message: "Form submitted and email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Error sending form", error: err });
  }
});

app.post("/api/test", async (req, res) => {
  message: {
    ("works");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
