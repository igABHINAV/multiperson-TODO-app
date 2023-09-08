const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already exists!",
            });
        }

        user = await User.create({ name, username, password });

        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });


        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

