const Task = require('../models/Task');

// NEW TASK
const addTask = async (req, res) => {
    const { title, description, dueDate, user } = req.body;
    if (!title || !description || !dueDate || !user) {
        res.json({ "message": "Please provide all the details" });
    }

    try {
        const newTask = await Task.create({
            title,
            description,
            dueDate,
            user
        });
        if (!newTask) {
            res.json({ "message": "Something went wrong when adding the task :( " });
        } else {
            res.json({ "message": "Task created Successfully :) ", "Task": newTask });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ "error": error.message });
    }
};

// GET TASKS
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks).status(200);
    } catch (error) {
        console.log(error.message);
        res.json({ "error": error.message });
    }
};

// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (task) {
            res.json({ "message": `Task with title, '${task.title}' was deleted successfully :)` }).status(200);
        } else {
            res.json({ "message": "Task not found :( " });
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message).status(500);
    }
}

// UPDATE TASK
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });

        console.log("saved");
        res.json(task).status(200);
    } catch (error) {
        console.log(error.message);
        res.json(error.message).status(500);
    }
};

// GET SINGLE TASK
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            res.json(task).status(200);
        } else {
            res.json({ "message": "Task not found :( " });
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message).status(500);
    }
}

module.exports = {
    addTask,
    getAllTasks,
    deleteTask,
    updateTask,
    getTask
}