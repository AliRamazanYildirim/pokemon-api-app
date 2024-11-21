const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") {
    alert("Bitte geben Sie einen Pokemon-Namen ein.");
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokemon nicht gefunden");
      }
      return response.json();
    })
    .then((data) => {
      displayPokemon(data);
      console.log(data);
    })
    .catch((error) => {
      alert(error.message);
    });
});

const displayPokemon = (pokemon) => {
  resultsContainer.innerHTML = "";

  const pokemonCard = document.createElement("div");
  pokemonCard.className = "pokemon-card";

  const pokemonName = document.createElement("h2");
  pokemonName.textContent = pokemon.name;
  pokemonCard.appendChild(pokemonName);

  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonImage.alt = pokemon.name;
  pokemonCard.appendChild(pokemonImage);

  const statsHeader = document.createElement("h3");
  statsHeader.textContent = "Stats";
  pokemonCard.appendChild(statsHeader);

  const statsList = document.createElement("ul");
  pokemon.stats.forEach((stat) => {
    const statItem = document.createElement("li");

    const statName = document.createElement("span");
    statName.textContent = stat.stat.name;

    const statValue = document.createElement("span");
    statValue.textContent = stat.base_stat;

    statItem.appendChild(statName);
    statItem.appendChild(statValue);
    statsList.appendChild(statItem);
  });
  pokemonCard.appendChild(statsList);

  const abilitiesHeader = document.createElement("h3");
  abilitiesHeader.textContent = "Abilities";
  pokemonCard.appendChild(abilitiesHeader);

  const abilitiesList = document.createElement("ul");
  pokemon.abilities.forEach((ability) => {
    const abilityItem = document.createElement("li");
    abilityItem.textContent = ability.ability.name;
    abilitiesList.appendChild(abilityItem);
  });
  pokemonCard.appendChild(abilitiesList);

  resultsContainer.appendChild(pokemonCard);
};
