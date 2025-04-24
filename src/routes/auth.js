// routes/auth.js (ES Modules version)
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const app = express.Router();


// Route d'inscription
app.post('/register', async (req, res) => {
  try{
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
    }
    // Création d'un nouvel utilisateur
    const newUser = new User({
      username,
      password,
      role: 'user' // role par défaut
    });
      await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  }
  catch (error) {
    res.status(500).json({
      message: 'Erreur d\'enregistrement de l\'utilisatheure',
      error: error.message
    });
  }  
    
});
  
  // Route de connexion
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      // Verify password using the method we defined in the model
      const validPassword = await user.comparePassword(password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      // Create and assign token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({
        message: 'Error logging in',
        error: error.message
      });
    }
  });
  

  export default app;