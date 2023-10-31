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
  
      res.status(201).json({ message: 'La Tash à étè créé avec succès.' });
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

module.exports = { CreateTask, GetTasksUsers };