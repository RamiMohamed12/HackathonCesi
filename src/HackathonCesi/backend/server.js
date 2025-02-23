const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:5500" }));
app.use(express.json());
app.use(
    session({
        secret: "your_secret_key", // Change this to a strong secret
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Secure: false for local testing
    })
);

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
