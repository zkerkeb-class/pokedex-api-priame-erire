import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pokemonsPath = path.join(__dirname, './data/pokemons.json');

// Load pokemons from file
let pokemonsList = JSON.parse(fs.readFileSync(pokemonsPath, 'utf8'));

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Get all pokémons
app.get("/api/pokemons", (req, res) => {
    res.status(200).json(pokemonsList);
});

// Get one by ID
app.get("/api/pokemons/:id", (req, res) => {
    const pokemon = pokemonsList.find(p => String(p.id) === req.params.id);
    if (!pokemon) {
        return res.status(404).json({ message: "Pokémon non trouvé." });
    }
    res.status(200).json(pokemon);
});

// Create a new Pokémon
app.post("/api/pokemons", (req, res) => {
    const exists = pokemonsList.some(p => p.id === req.body.id);
    if (exists) {
        return res.status(400).json({ message: "Un pokémon avec cet ID existe déjà" });
    }
    pokemonsList.push(req.body);
    fs.writeFileSync(pokemonsPath, JSON.stringify(pokemonsList, null, 2));
    res.status(201).json(req.body);
});

// Update
app.put("/api/pokemons/:id", (req, res) => {
    const index = pokemonsList.findIndex(p => String(p.id) === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    pokemonsList[index] = { ...pokemonsList[index], ...req.body };
    fs.writeFileSync(pokemonsPath, JSON.stringify(pokemonsList, null, 2));
    res.status(200).json(pokemonsList[index]);
});

// Delete
app.delete("/api/pokemons/:id", (req, res) => {
    const index = pokemonsList.findIndex(p => String(p.id) === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    const removed = pokemonsList.splice(index, 1)[0];
    fs.writeFileSync(pokemonsPath, JSON.stringify(pokemonsList, null, 2));
    res.status(200).json({ message: "Pokémon supprimé", pokemon: removed });
});
// Start server
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
