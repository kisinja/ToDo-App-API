const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .send({ error: "Please provide both email and password!!" });
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ user: { id: user.id, role: user.role } }, "elvis", { expiresIn: "1h" });
                const { password, ...others } = user._doc;
                return res.json({ "token": token, "user": others }).status(200);
            } else {
                res.status(400).json({ message: "Invalid Password" });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.json(error).status(500);
    }
};

module.exports = { login };