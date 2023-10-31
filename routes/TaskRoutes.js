const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');
const AuthenticateToken = require('../middleware/Auth');

// Routes de gestion des tâches
router.post('/create', AuthenticateToken, taskController.CreateTask);
router.get('/', AuthenticateToken, taskController.GetTasksUsers);
router.put('/update/:id', AuthenticateToken, taskController.UpdateTask);
router.patch('/update/:id', AuthenticateToken, taskController.UpdateTaskComplet);
// router.delete('/delete/:id', AuthenticateToken, taskController.DeleteTask);

module.exports = router;