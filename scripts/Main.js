import { createCards, loadPokemons, createEntries } from "./PopUps.js";
import { createPokemons } from "./PokemonData.js";

createPokemons();
createCards();
createEntries();
loadPokemons()
window.onscroll = loadPokemons;
