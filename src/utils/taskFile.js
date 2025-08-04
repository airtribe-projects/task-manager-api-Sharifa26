// taskService.js
const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, '../../task.json');

function readTasksFromFile() {
    const fileContent = fs.readFileSync(tasksFilePath, 'utf8');
    const tasksArray = JSON.parse(fileContent);
    if (!Array.isArray(tasksArray)) {
        throw new Error('Tasks JSON file does not contain an array');
    }

    return tasksArray;
}

function writeTasksToFile(tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

module.exports = { readTasksFromFile, writeTasksToFile };
