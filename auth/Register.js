const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await User.create({
            username,
            email,
            password:bcrypt.hashSync(password, 10)
        });
        if (newUser) {
            res.status(201).json({ message: "User created Succeffully :)", user: newUser });
        } else {
            res.send(400).json({ message: "Invalid User Data" });
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
};

module.exports = { register };