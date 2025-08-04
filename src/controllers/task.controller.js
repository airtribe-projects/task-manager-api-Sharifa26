const taskService = require('../services/task.service');
const taskController = {};

// GET ALL TASKS
taskController.getAllTasks = (req, res) => {
    try {
        const tasks = taskService.getAllTasks(req.query);
        res.success(tasks, "Tasks retrieved successfully.", 200);
    } catch (error) {
        console.error("Error in getAllTasks controller:", error);
        res.status(500).json({ message: error.message });
    }
};

// GET TASK BY ID
taskController.getTaskById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = taskService.getTaskById(id);
        if (!task) return res.status(404).json({ message: `Task with id ${id} not found` });
        res.success(task, "Task retrieved successfully.", 200);
    } catch (error) {
        console.error("Error in getTaskById controller:", error);
        res.status(500).json({ message: error.message });
    }
};

// GET TASKS BY PRIORITY
taskController.getTasksByPriority = (req, res) => {
    try {
        const level = req.params.level.toLowerCase();
        const tasks = taskService.getTasksByPriority(level);
        res.success(tasks, "Tasks retrieved successfully.", 200);
    } catch (error) {
        console.error("Error getting tasks by priority:", error);
        res.status(400).json({ message: error.message });
    }
};

// CREATE TASK
taskController.createTask = (req, res) => {
    try {
        const { newTask, errors } = taskService.createTask(req.body);
        if (errors) return res.status(400).json({ errors });
        res.success(newTask, "Task created successfully.", 201);
    } catch (error) {
        console.error("Error in createTask controller:", error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE TASK
taskController.updateTask = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { errors } = taskService.updateTask(id, req.body) || {};
        if (errors) return res.status(400).json({ errors });
        const updatedTask = taskService.updateTask(id, req.body);
        if (!updatedTask) return res.status(404).json({ message: `Task with id ${id} not found.` });
        res.success(updatedTask, "Task updated successfully.", 200);
    } catch (error) {
        console.error("Error in updateTask controller:", error);
        res.status(500).json({ message: error.message });
    }
};

// PATCH TASK
taskController.patchTask = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = taskService.patchTask(id, req.body);
        if (!result) return res.status(404).json({ message: `Task with id ${id} not found.` });
        if (result.error) return res.status(400).json({ message: result.error });
        res.success(result, "Task updated successfully.", 200);
    } catch (error) {
        console.error("Error in patchTask controller:", error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE TASK
taskController.deleteTask = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedTask = taskService.deleteTask(id);
        if (!deletedTask) return res.status(404).json({ message: `Task with id ${id} not found.` });
        res.success(deletedTask, "Task deleted successfully.", 200);
    } catch (error) {
        console.error("Error in deleteTask controller:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = taskController;
