const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register user
exports.register = async (req, res) => {
    const { email, password, number } = req.body;

    // Validate that phone number is exactly 10 characters
    if (!number || number.length !== 10) {
        return res.status(400).json({ success: false, message: "Phone number must be exactly 10 digits" });
    }

    try {
        // Check if a user with the same email or phone number already exists
        const userExists = await User.findOne({ $or: [{ email }, { number }] });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const newUser = await User.create({ email, password, number });
        req.session.userId = newUser._id;

        res.status(201).json({ success: true, message: "Registration successful", userId: newUser._id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        req.session.userId = user._id;

        res.status(200).json({ success: true, message: "Login successful", userId: user._id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logout user
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Logout failed" });
        }

        res.status(200).json({ success: true, message: "Logged out successfully" });
    });
};