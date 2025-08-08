const  express = require('express');
const taskRoutes = require('../controllers/task.controller');
const router = express.Router();

router.get("/", taskRoutes.getAllTasks);
router.get("/:id", taskRoutes.getTaskById);
router.post("/", taskRoutes.createTask);
router.put("/:id", taskRoutes.updateTask);
router.patch("/:id", taskRoutes.patchTask);
router.delete("/:id", taskRoutes.deleteTask);
router.get("/priority/:level", taskRoutes.getTasksByPriority);

module.exports = router;
