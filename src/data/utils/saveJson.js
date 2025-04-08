const saveJson()
fs.writeFileSync(_path.join(_dirname, "./data/pokemons.json"),
JSON. stringify(pokemonsList, null, 2)
);
export saveJson;