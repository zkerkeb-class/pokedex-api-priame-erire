import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";

// Configuration des variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

// Configuration d'Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Configuration CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/api/pokemons", pokemonRoutes);

// Route de base
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Pokémon avec MongoDB");
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
});




/*
// Middleware pour servir des fichiers statiques
// 'app.use' est utilisé pour ajouter un middleware à notre application Express
// '/assets' est le chemin virtuel où les fichiers seront accessibles
// 'express.static' est un middleware qui sert des fichiers statiques
// 'path.join(__dirname, '../assets')' construit le chemin absolu vers le dossier 'assets'
//app.use("/assets", express.static(path.join(__dirname, "../assets")));

// ajout d'un pokémon
// Route GET de base
// Route GET pour obtenir un Pokémon par ID
// GET FONCTIONNE
app.get("/api/pokemons/:id", (req, res) => {
  const pokemonId = req.params.id;
  const pokemon = pokemonsList.find(p => p.id === parseInt(pokemonId));

  if (pokemon) {
    res.status(200).send(pokemon);
  } else {
    res.status(404).send({ message: "Pokémon non trouvé" });
  }
});

/// Ajout d'un pokémon
app.post("/api/pokemons/id:", (req, res) => {
  const newPokemon = req.body; //récupérer que l'ID
    // Vérification des données
    if (!newPokemon.id || !newPokemon.name) {
        return res.status(400).json({ message: "ID et nom requis" });
    }

    // Vérifier si l'ID existe déjà
    if (pokemonsList.some(p => p.id === newPokemon.id)) {
        return res.status(409).json({ message: "Cet ID existe déjà"});
    }

    pokemonsList.push(newPokemon);

    // Sauvegarde des données mises à jour dans le fichier JSON
    fs.writeFileSync(dataFilePath, JSON.stringify(pokemonsList, null, 2));

    res.status(201).json({ message: "Pokémon ajouté avec succès", pokemon: newPokemon });
})

app.get("/api/pokemons", (req, res) => {
  res.status(200).send({
    pokemons: pokemonsList,
  });
});

/// CORRECTION DU PROFESSEUR {

// :variable
// res. met un terme à la requête
app.post("/api/pokemons/:id", (req, res) => {
// le req req.param.id , req.param // Req beaucoup d'information pour les couches réseaux par exemple.
console.log(req.params.id)
// typeof.nomObject donne le type
const pokemon = pokemonsList.find( /// itérer sur les zones du tableau /!\ info unique
  (pokemon)=> pokemon.id === parseInt(req.params.id) // il faut convertir le 
)
if(!pokemon){ // erreur pas que du texte, on peut des infos supplémentaire
  res.send(404).send({
    type:'error',
    message:'Pokemon not found'
  })
}  
console.log(pokemon) // on peut ajoute différente infos : une flamme 
res.status(200).send(pokemon)
//res.status(200).send("Salut à tous")

});
// FONCTIONNE
//POST Ajout
app.post("/api/pokemons/", (req, res) => {
// Faire validation du body
  console.log(req.body);
pokemonsList.push(req.body);
console. log(pokemonsList);
fs.writeFileSync(path.join(__dirname, "./data/pokemons.json"),
JSON. stringify(pokemonsList, null, 2)
);
res.status (200). send ({
type: "success",
pokemons: pokemonsList,
message: "Pokemon created",
});
});

// FONCTIONNE
// DELETE
app.delete("/api/pokemons/:id", (req, res) => {
console.log(req.params.id);
const pokemon  = pokemonsList.find(
  (pokemon)=> pokemon.id === parseInt(req.params.id)
)
if(!pokemon){
  return res.status (404).send({
    type:"error",
    message:"Pokemon not found"
  })
}
  const newPokemonList = pokemonsList.filter(
    (pokemon) => pokemon.id != parseInt(req.params.id)
  );

  fs.writeFileSync(path.join(__dirname, "./data/pokemons.json"), JSON. stringify(newPokemonList, null, 2))
  res.status (200). send ({
  type: "success",
  pokemons: pokemonsList,
  message: "Pokemon deleted",
  });
});

/// PUT  Modification UPDATE 
// on renvoie tous les champs pour les modifier.
// PUT - Mettre à jour un Pokémon dans le JSON local
// PUT FONCTIONNE
app.put("/api/pokemons/:id", (req, res) => {
  console.log("ID reçu :", req.params.id);

  const pokemon = pokemonsList.find(
    (pokemon) => pokemon.id === parseInt(req.params.id)
  );

  if (!pokemon) {
    return res.status(404).send({
      type: "error",
      message: "Pokemon not found"
    });
  }

  const indexOfPokemon = pokemonsList.indexOf(pokemon);
  console.log("Indice du Pokémon :", indexOfPokemon);

  // Remplacer l’ancien Pokémon par le nouveau
  pokemonsList.splice(indexOfPokemon, 1, req.body);

  // Écriture dans le fichier JSON
  fs.writeFileSync(
    path.join(__dirname, "./data/pokemons.json"),
    JSON.stringify(pokemonsList, null, 2)
  );

  res.status(200).send({
    type: "success",
    message: "Pokémon mis à jour avec succès",
    data: req.body
  });
});



/// ASTUCE
// Création route
// Req status
// console log



/*
// Route POST pour ajouter un nouveau Pokémon
app.post("/api/pokemons/id", (req, res) => {
  const newPokemon = req.body;
  console.log(newPokemon);
  // Code pour ajouter le nouveau Pokémon à la liste
});
*/
/*
// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  //req.body
});*/