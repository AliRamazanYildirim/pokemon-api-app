const fetchAllPokemonImages = async () => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const numberOfPokemon = 151; //! Anzahl der Pokémon der ersten Generation
  const pokemonImagesContainer = document.getElementById('pokemonImages');
  pokemonImagesContainer.innerHTML = '';
  const pokemonData = [];
  
  for (let i = 1; i <= numberOfPokemon; i++) {
    const response = await fetch(`${baseUrl}${i}`);
    const pokemon = await response.json();
    pokemonData.push({ name: pokemon.name, imageUrl: pokemon.sprites.front_default });
    console.log({ name: pokemon.name, imageUrl: pokemon.sprites.front_default });
  }
  
  //! Sort Pokémon data by name
  pokemonData.sort((a, b) => a.name.localeCompare(b.name));
  
  //! Display sorted Pokémon images
  pokemonData.forEach(pokemon => {
    const imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;
    imgElement.alt = pokemon.name;
    pokemonImagesContainer.appendChild(imgElement);
  });
}
document.getElementById('fetchButton').addEventListener('click', fetchAllPokemonImages);