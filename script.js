const inputNameId = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id')
const pokemonWeight = document.getElementById('weight')
const pokemonHeight = document.getElementById('height')
const pokemonImage = document.getElementById('pokemonPicture')
const hpPokemon = document.getElementById('hp')
const attackPokemon = document.getElementById('attack')
const defensePokemon = document.getElementById('defense')
const spAttackPokemon = document.getElementById('special-attack')
const spDefensePokemon = document.getElementById('special-defense')
const speedPokemon = document.getElementById('speed')
const pokemonType = document.getElementById('types')

let pokemonNameId = [];

fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
.then((res) => res.json())
.then((data) => {
    pokemonNameId = data.results;
    
})
.catch((err) => {
   alert("There an error loading the data")
});

const displayPokemons = (pokemon) => {
    pokemonName.innerHTML = "Não contém"; // Define o valor padrão para "Não contém"
    
    const inputName = inputNameId.value.toLowerCase();

    const foundPokemon = pokemon.find(({ name, id }) => name === inputName || id === parseInt(inputName));
    
    if (foundPokemon) {
        const { name, id, url, types } = foundPokemon;
        pokemonName.innerHTML = `${name.toUpperCase()}`;
        pokemonId.innerHTML = `#${id}`;
        
        fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${name}`)
        .then((res) => res.json())
        .then((pokemonDetails) => {
            const { height, weight, sprites: { front_default }, stats} = pokemonDetails;
            pokemonWeight.innerHTML = `Weight: ${weight}`; // Exibindo o peso do Pokémon
            pokemonHeight.innerHTML = `Height: ${height}`;
            pokemonImage.innerHTML = `<img id="sprite" src="${front_default}" style="width: 200%;">`;

               // Acessando os base_stats
                const baseStats = stats.map(stat => stat.base_stat);
                const [hp, attack, defense, specialAttack, specialDefense, speed] = baseStats;
                hpPokemon.innerHTML = `${hp}`
                attackPokemon.innerHTML = `${attack}`
                defensePokemon.innerHTML = `${defense}`
                spAttackPokemon.innerHTML = `${specialAttack}`
                spDefensePokemon.innerHTML = `${specialDefense}`
                speedPokemon.innerHTML = `${speed}`
                
                // Criando um novo elemento <p> para tipos
            const typesContainer = document.createElement('p');
            typesContainer.innerHTML = pokemonDetails.types.map(type => type.type.name.toUpperCase()).join(' ');
            
            // Substituindo o conteúdo de pokemonType com o novo elemento
            pokemonType.innerHTML = '';
            pokemonDetails.types.forEach((type) => {
                const typeElement = document.createElement('p');
                typeElement.innerHTML = type.type.name.toUpperCase();
                pokemonType.appendChild(typeElement);
            });
        });
}   else {
            // Não encontrou nenhum Pokémon com o nome pesquisado
            alert('Pokémon not found')
            pokemonName.innerHTML = "Not found";
            pokemonId.innerHTML = "";
            pokemonWeight.innerHTML = "";
            pokemonHeight.innerHTML = "";
            pokemonImage.innerHTML = "";
            hpPokemon.innerHTML = "";
            attackPokemon.innerHTML = "";
            defensePokemon.innerHTML = "";
            spAttackPokemon.innerHTML = "";
            spDefensePokemon.innerHTML = "";
            speedPokemon.innerHTML = "";
            pokemonType.innerHTML = "";
        }
    };

searchBtn.addEventListener('click', () => {
  displayPokemons(pokemonNameId);
});

const handleSearch = () => {
  displayPokemons(pokemonNameId);
};
inputNameId.addEventListener('keypress', (event) => {
  // Verifica se a tecla pressionada é a tecla "Enter" (código 13)
  if (event.key === 'Enter') {
    handleSearch(); // Chama a função de lidar com a pesquisa
  }
});