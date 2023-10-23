const bcrypt = require('bcrypt');
const saltRounds = 10;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
    try {
      const { email, password, name } = req.body;

      if(!email || !password || !name){
        return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
      }

      if(password.length < 8){
        return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' });
      }
      
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        return res.status(400).json({ error: 'Cet email à déjà était utiliser.' });
      }

      const userData = {
        email,
        password: hashedPassword,
        name,
      };
  
      const newUser = await prisma.user.create({
        data: userData,
      });
  
      res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
      console.error('Erreur d\'enregistrement:', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'enregistrement.' });
    }
  };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Identifiant Incorrect.' });
    }

    res.status(200).json({ message: 'Connexion réussie.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'authentification.' });
  }
};

module.exports = { register, login };
