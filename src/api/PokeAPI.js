import axios from "axios";

export default class PokeAPI {
  static pokemonList = [];

  static itemList = [];
  static natureList = [
    {
      name: "hardy",
    },
    {
      name: "lonely",
      modifier: "+Atk -Def",
    },
    {
      name: "adamant",
      modifier: "+Atk -SpAtk",
    },
    {
      name: "naughty",
      modifier: "+Atk -SpDef",
    },
    {
      name: "brave",
      modifier: "+Atk -Speed",
    },
    {
      name: "bold",
      modifier: "+Def -Atk",
    },
    {
      name: "docile",
    },
    {
      name: "impish",
      modifier: "+Def -SpAtk",
    },
    {
      name: "lax",
      modifier: "+Def -SpDef",
    },
    {
      name: "relaxed",
      modifier: "+Def -Speed",
    },
    {
      name: "modest",
      modifier: "+SpAtk -Atk",
    },
    {
      name: "mild",
      modifier: "+SpAtk -Def",
    },
    {
      name: "bashful",
    },
    {
      name: "rash",
      modifier: "+SpAtk -SpDef",
    },
    {
      name: "quiet",
      modifier: "+SpAtk -Speed",
    },
    {
      name: "calm",
      modifier: "+SpDef -Atk",
    },
    {
      name: "gentle",
      modifier: "+SpDef -Def",
    },
    {
      name: "careful",
      modifier: "+SpDef -SpAtk",
    },
    {
      name: "quirky",
    },
    {
      name: "sassy",
      modifier: "+SpDef -Speed",
    },
    {
      name: "timid",
      modifier: "+Speed -Atk",
    },
    {
      name: "hasty",
      modifier: "+Speed -Def",
    },
    {
      name: "jolly",
      modifier: "+Speed -SpAtk",
    },
    {
      name: "naive",
      modifier: "+Speed -SpDef",
    },
    {
      name: "serious",
    },
  ];

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
