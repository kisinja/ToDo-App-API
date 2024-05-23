const express = require('express');
const router = express.Router();

const { getUsers, updateUser, getUser, deleteUser } = require('../controllers/Users');

router.get("/", getUsers);
router.put("/:id", updateUser);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

module.exports = router;