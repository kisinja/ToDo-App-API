const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send({ message: `User ${username} does not exist` });

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: "Invalid password" });
        } else {
            const token = jwt.sign({ user: { id: user.id, role: user.role } }, "elvis", { expiresIn: "1h" });

            return res.send({ "message": `Hi, ${user.username}. Logged in successfully. Use the token below to send requests :)`, "token": token }).status(201);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
}

module.exports = { login };