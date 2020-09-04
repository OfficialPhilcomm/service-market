import axios from "axios";

export default class PokeAPI {
  static pokemonList = [];

  static itemList = [];

  static POKE_API_BASE_URL = "https://pokeapi.co/api/v2/";

  static async requestPokemonList() {
    const response = await axios({
      method: "get",
      url: this.POKE_API_BASE_URL + "pokemon?limit=647",
    });

    this.pokemonList = response.data.results;

    const itemResponse = await axios({
      method: "get",
      url: this.POKE_API_BASE_URL + "item?limit=954",
    });

    console.log(itemResponse.data.results);

    this.itemList = [
      {
        name: "none",
      },
    ].concat(itemResponse.data.results);
  }

  static async getAdvancedData(index) {
    const p = this.pokemonList[index];
    if (p.data) {
      return p;
    } else {
      const response = await axios({
        method: "get",
        url: p.url,
      });
      this.pokemonList[index] = {
        ...this.pokemonList[index],
        ...{ data: response.data },
      };
      return this.pokemonList[index];
    }
  }

  static async getSpriteURL(pokemonName) {
    try {
      const response = await axios({
        method: "get",
        url: `${this.POKE_API_BASE_URL}pokemon/${pokemonName}`,
      });

      return response.data.sprites.front_default;
    } catch (error) {
      return null;
    }
  }
}
