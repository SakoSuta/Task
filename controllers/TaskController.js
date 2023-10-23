const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Contrôleur pour l'enregistrement d'un utilisateur
const Create = async (req, res) => {
    try {
      const { email, password, name } = req.body;
  
      // Créez un objet de données avec les champs nécessaires
      const userData = {
        email,
        password, // Vous devriez stocker le mot de passe de manière sécurisée, par exemple, en le hachant.
        name,
      };
  
      // Envoyez les données à la base de données
      const newUser = await prisma.user.create({
        data: userData,
      });
  
      res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
      console.error('Erreur d\'enregistrement:', error);
      res.status(400).json({ error: 'Une erreur s\'est produite lors de l\'enregistrement.' });
    }
  };

module.exports = { Create };