import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// server configuration for 
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Set up file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/pokemon-db";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define Pokemon Schema
const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: {
    english: String,
    japanese: String,
    chinese: String,
    french: String
  },
  type: [String],
  base: {
    HP: Number,
    Attack: Number,
    Defense: Number,
    "Sp. Attack": Number,
    "Sp. Defense": Number,
    Speed: Number
  },
  image: String,
  imageShiny: String
}, { strict: false }); // strict: false allows additional fields not in schema

// Create Pokemon model
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Get all pokémons
app.get("/api/pokemons", async (req, res) => {
    console.log("Salut je cherche otous les pokémùons")
  try {
    const pokemons = await Pokemon.find({});
    console.log(`Found ${pokemons.length} Pokemon`);
    // Log the first pokemon to verify data structure
    if (pokemons.length > 0) {
      console.log("Sample Pokemon data:", JSON.stringify(pokemons[0], null, 2));
    }
    res.status(200).json(pokemons);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    res.status(500).json({ message: "Failed to fetch Pokemon data" });
  }
});

// Get one by ID
app.get("/api/pokemons/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé." });
    }
    res.status(200).json(pokemon);
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    res.status(500).json({ message: "Failed to fetch Pokemon" });
  }
});

// Create a new Pokémon
app.post("/api/pokemons", async (req, res) => {
  try {
    const exists = await Pokemon.findOne({ id: req.body.id });
    if (exists) {
      return res.status(400).json({ message: "Un pokémon avec cet ID existe déjà" });
    }
    const newPokemon = new Pokemon(req.body);
    await newPokemon.save();
    res.status(201).json(newPokemon);
  } catch (error) {
    console.error('Error creating Pokemon:', error);
    res.status(500).json({ message: "Failed to create Pokemon" });
  }
});

// Update
app.put("/api/pokemons/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true } // Return the updated document
    );
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    res.status(200).json(pokemon);
  } catch (error) {
    console.error('Error updating Pokemon:', error);
    res.status(500).json({ message: "Failed to update Pokemon" });
  }
});

// Delete
app.delete("/api/pokemons/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOneAndDelete({ id: req.params.id });
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    res.status(200).json({ message: "Pokémon supprimé", pokemon });
  } catch (error) {
    console.error('Error deleting Pokemon:', error);
    res.status(500).json({ message: "Failed to delete Pokemon" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});