import axios from "axios";

export default class PokeAPI {
  static pokemonList = [];

  static POKE_API_BASE_URL = "https://pokeapi.co/api/v2/";

  static async requestPokemonList() {
    const response = await axios({
      method: "get",
      url: this.POKE_API_BASE_URL + "pokemon?limit=647",
    });

    this.pokemonList = response.data;
  }
}
