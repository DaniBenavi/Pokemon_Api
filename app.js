const form = document.querySelector('form')
const inputPokemon = document.querySelector('input')
const card = document.querySelector('.card')

window.onload = () => {
  getRandomPokemon()
}

form.addEventListener('submit', event => {
  event.preventDefault()
  const pokemonNameOrId = inputPokemon.value.toLowerCase()
  if (pokemonNameOrId === '') {
    getRandomPokemon()
  }

  getPokemonData(pokemonNameOrId)
})

async function getPokemonData(nameOrId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)
    const pokemon = await response.json()
    displayPokemonData(pokemon)
  } catch (error) {
    console.error(error)
    displayNotFound()
  }
}

function displayPokemonData(pokemon) {
  const { name, types, stats, sprites } = pokemon
  const hp = stats.find(stat => stat.stat.name === 'hp').base_stat
  const attack = stats.find(stat => stat.stat.name === 'attack').base_stat
  const defense = stats.find(stat => stat.stat.name === 'defense').base_stat
  const specialAttack = stats.find(stat => stat.stat.name === 'special-attack').base_stat
  const image = sprites.other.dream_world.front_default

  card.innerHTML = `
  <img src="${image}" alt="${name}"/>
  <div class="card-body text-center">
    <h2>${name}</h2>
    <ul class="list-group list-group-flush">
      <li>Type: ${types[0].type.name}</li>
      <li>HP: ${hp}</li>
      <li>Attack: ${attack}</li>
      <li>Defense: ${defense}</li>
      <li>Special Attack: ${specialAttack}</li>
    </ul>
  </div>
  `
}
function displayNotFound() {
  card.innerHTML = `<h2>Pokemon not found</h2>`
}

async function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1
  try {
    const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
    const response = await fetch(`${API_URL}${randomId}`)
    const pokemon = await response.json()
    displayPokemonData(pokemon)
  } catch (error) {
    console.error(error)
    // handle the error here
  }
}
