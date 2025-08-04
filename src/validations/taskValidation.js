
function validateTaskInput({ title, description, completed, priority }) {
    const errors = [];
    const allowedPriorities = ['low', 'medium', 'high'];
    if (!title || typeof title !== "string" || !title.trim()) {
        errors.push("Title is required and must be a non-empty string.");
    }
    if (!description || typeof description !== "string" || !description.trim()) {
        errors.push("Description is required and must be a non-empty string.");
    }
    if (completed !== undefined && typeof completed !== "boolean") {
        errors.push("Completed must be a boolean if provided.");
    }
    if (priority !== undefined && !allowedPriorities.includes(priority)) {
        errors.push("Priority must be low, medium, or high.");
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = validateTaskInput;
