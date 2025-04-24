// Route protégée - accessible uniquement avec un token valide
app.get('/api/profile', auth, (req, res) => {
    res.json({
      message: 'Profil récupéré avec succès',
      user: req.user
    });
  });
  
  // Route protégée avec vérification de rôle
  app.get('/api/admin', auth, (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé: droits d\'administrateur requis' });
    }
  
    res.json({
      message: 'Zone administrative',
      user: req.user
    });
  });
  