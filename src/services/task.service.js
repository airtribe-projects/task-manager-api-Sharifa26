const { readTasksFromFile, writeTasksToFile } = require('../utils/taskFile');
const validateTaskInput = require('../validations/taskValidation');
let tasks = readTasksFromFile();


const taskService = {};
// Get all tasks with optional filters for completed, pagination
taskService.getAllTasks = ({ completed, limit, offset }) => {

    if (completed !== undefined) {
        const completedBool = completed === 'true';
        tasks = tasks.filter(task => task.completed === completedBool);
    }

    const limitNum = limit !== undefined ? parseInt(limit) : tasks.length;
    const offsetNum = offset !== undefined ? parseInt(offset) : 0;
    const result = tasks.slice(offsetNum, offsetNum + limitNum);

    return result;
}

// Get task by id
taskService.getTaskById = (id) => {
    return tasks.find(task => task.id === id);
}

// Get tasks by priority
taskService.getTasksByPriority = (level) => {
    const allowedPriorities = ['low', 'medium', 'high'];
    if (!allowedPriorities.includes(level.toLowerCase())) {
        throw new Error(`Priority level must be one of: ${allowedPriorities.join(', ')}`);
    }
    return tasks.filter(task => task.priority && task.priority.toLowerCase() === level.toLowerCase());
}

//create task
taskService.createTask = (data) => {
    const { title, description, completed, priority } = data;
    const { isValid, errors } = validateTaskInput(data);
    if (!isValid) {
        return { errors };
    }
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const allowedPriorities = ['low', 'medium', 'high'];
    const priorityVal = allowedPriorities.includes(priority) ? priority : 'low';
    const newTask = {
        id: newId,
        title: title.trim(),
        description: description.trim(),
        completed: completed === undefined ? false : completed,
        priority: priorityVal
    };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    return { newTask };
}

//update task
taskService.updateTask = (id, data) => {
    const { title, description, completed, priority } = data;
    const { isValid, errors } = validateTaskInput(data);
    if (!isValid) {
        return { errors };
    }
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return null;
    }
    const updatedTask = { id, title: title.trim(), description: description.trim(), completed, priority };
    tasks[taskIndex] = updatedTask;
    writeTasksToFile(tasks);
    return updatedTask;
}

//patch task
taskService.patchTask = (id, updates) => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return null;
    }
    const task = tasks[taskIndex];

    if (updates.title !== undefined) {
        if (typeof updates.title !== 'string' || !updates.title.trim()) {
            return { error: 'Title must be a non-empty string.' };
        }
        task.title = updates.title.trim();
    }
    if (updates.description !== undefined) {
        if (typeof updates.description !== 'string' || !updates.description.trim()) {
            return { error: 'Description must be a non-empty string.' };
        }
        task.description = updates.description.trim();
    }
    if (updates.completed !== undefined) {
        if (typeof updates.completed !== 'boolean') {
            return { error: '`completed` must be a boolean.' };
        }
        task.completed = updates.completed;
    }
    if (updates.priority !== undefined) {
        const allowedPriorities = ['low', 'medium', 'high'];
        if (!allowedPriorities.includes(updates.priority)) {
            return { error: '`priority` must be one of: low, medium, high.' };
        }
        task.priority = updates.priority;
    }

    tasks[taskIndex] = task;
    writeTasksToFile(tasks);
    return task;
}

//delete task
taskService.deleteTask = (id) => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return null;
    }
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    writeTasksToFile(tasks);
    return deletedTask;
}

module.exports = taskService;
