const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users) {
            res.json(users).status(200);
        } else {
            res.json("No users found").status(404);
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message).status(500);
    }
};

const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, { new: true });
    res.status(200).json(user);
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        if (user) {
            res.json(others).status(200);
        } else {
            res.json({ "message": "User not found :( " });
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message).status(500);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ "message": `${user.username} was deleted successfully :)` }).status(200);
        } else {
            res.json({ "message": "User not found :( " });
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message).status(500);
    }
};

module.exports = { getUsers, updateUser, getUser, deleteUser };