const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CreateTask = async (req, res) => {
  const userData = req.user; 
  console.log(userData);
  try {
    const { body } = req.body;

    if(!body) {
      return res.status(400).json({ error: 'Vous devez fournir une description de la tâche.' });
    }

    const taskData = {
      user_id: userData.userId, 
      body
    };

    const newTask = await prisma.task.create({
      data: taskData,
    });

    res.status(201).json({ message: 'La Tash à étè créé avec succès.', newTask });
  } catch (error) {
    console.error('Erreur complete:', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la Création de la task.' });
  }
};

const GetTasksUsers = async (req, res) => {
  const userData = req.user;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        user_id: userData.userId,
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur complete:', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des tasks.' });
  }
}

const UpdateTask = async (req, res) => {
  const userData = req.user;
  try {
    const { id } = req.params;
    const { body } = req.body;

    if(!body) {
      return res.status(400).json({ error: 'Vous devez fournir une description de la tâche.' });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        user_id: userData.userId,
      },
    });

    if(!task) {
      return res.status(404).json({ error: 'La tâche n\'existe pas.' });
    }

    const taskData = {
      body,
    };

    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: taskData,
    });

    res.status(200).json({ message: 'La tâche à été modifié avec succès.', updatedTask });
  } catch (error) {
    console.error('Erreur complete:', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la modification de la tâche.' });
  }
}

const UpdateTaskComplet = async (req, res) => {
  const userData = req.user;
  const { completed } = req.body;
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        user_id: userData.userId,
      },
    });

    if(!task) {
      return res.status(404).json({ error: 'La tâche n\'existe pas.' });
    }

    const taskData = {
      completed,
    };

    const updatedTaskCompleted = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: taskData,
    });

    res.status(200).json({ message: 'Le status "Complete" de votre tâche à bien été modifier.', updatedTaskCompleted });
  } catch (error) {
    console.error('Erreur complete:', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la modification de la tâche.' });
  }
}

module.exports = { CreateTask, GetTasksUsers, UpdateTask, UpdateTaskComplet };