const express = require('express');
const router = express.Router();

const { addTask, getAllTasks, deleteTask, updateTask, getTask } = require('../controllers/Tasks');

router.post("/", addTask);
router.get("/", getAllTasks);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.get("/:id", getTask);

module.exports = router;