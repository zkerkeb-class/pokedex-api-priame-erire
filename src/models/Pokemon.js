import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    english: String,
    japanese: String,
    chinese: String,
    french: String
  },
  type: [{
    type: String,
    enum: [
      "Fire", "Water", "Grass", "Electric", "Ice", "Fighting",
      "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock",
      "Ghost", "Dragon", "Dark", "Steel", "Fairy"
    ]
  }],
  image: {
    type: String
  },
  base: {
    HP: Number,
    Attack: Number,
    Defense: Number,
    "Sp_Attack": Number,  
    "Sp_Defense": Number, 
    Speed: Number
  }
}, {
  timestamps: true
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
