const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');
const AuthenticateToken = require('../middleware/Auth');

// Routes de gestion des tâches
// router.post('/create', AuthenticateToken, taskController.createTask);
// router.get('/list', taskController.listTasks);
// router.get('/filter', taskController.filterTasks);
// router.put('/update/:taskId', taskController.updateTask);
// router.delete('/delete/:taskId', taskController.deleteTask);

module.exports = router;