import React, { Component } from "react";
import CloseablePopup from "../CloseablePopup";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import PokeAPI from "../../../api/PokeAPI";
import StringUtils from "../../../api/StringUtils";
import "./CreateOrderPopup.css";

export default class CreateOrderPopup extends Component {
  static contextType = ApplicationContext;

  state = {
    p: null,
  };

  async componentDidMount() {
    const pokemon = await PokeAPI.getAdvancedData(0);
    this.setState({ p: pokemon });
  }

  switchPokemon = (event) => {
    const index = parseInt(event.target.value);
    this.displayPokemonData(index);
  };

  displayPokemonData = async (index) => {
    const pokemon = await PokeAPI.getAdvancedData(index);
    this.setState({ p: pokemon });
  };

  render() {
    const p = this.state.p;
    console.log(p);

    return (
      <CloseablePopup closeCallback={this.props.closeCallback}>
        <div className="content">
          <div className="create-row">
            <select onChange={this.switchPokemon}>
              {PokeAPI.pokemonList.map((pokemon, index) => (
                <option value={index} key={index}>
                  {StringUtils.humanize(pokemon.name)}
                </option>
              ))}
            </select>
            <span>lvl</span>
            <select>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          {p ? (
            <React.Fragment>
              <div className="create-row">
                <select>
                  {p.data.abilities.map((ability) => (
                    <option
                      value={ability.ability.name}
                      key={ability.ability.name}
                    >
                      {StringUtils.humanize(ability.ability.name)}
                    </option>
                  ))}
                </select>
                <select>
                  {PokeAPI.itemList.map((item) => (
                    <option value={item.name} key={item.name}>
                      {StringUtils.humanize(item.name)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="create-row">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <select>
                          {p.data.moves.map((move) => (
                            <option value={move.move.name} key={move.move.name}>
                              {StringUtils.humanize(move.move.name)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select>
                          {p.data.moves.map((move) => (
                            <option value={move.move.name} key={move.move.name}>
                              {StringUtils.humanize(move.move.name)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select>
                          {p.data.moves.map((move) => (
                            <option value={move.move.name} key={move.move.name}>
                              {StringUtils.humanize(move.move.name)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select>
                          {p.data.moves.map((move) => (
                            <option value={move.move.name} key={move.move.name}>
                              {StringUtils.humanize(move.move.name)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="create-row">
                <table>
                  <tbody>
                    <tr>
                      <th />
                      <th>HP</th>
                      <th>ATK</th>
                      <th>DEF</th>
                      <th>SPATK</th>
                      <th>SPDEF</th>
                      <th>SPEED</th>
                    </tr>
                    <tr>
                      <td>IV</td>
                      <td>
                        <input type="number" min="0" max="31" />
                      </td>
                      <td>
                        <input type="number" min="0" max="31" />
                      </td>
                      <td>
                        <input type="number" min="0" max="31" />
                      </td>
                      <td>
                        <input type="number" min="0" max="31" />
                      </td>
                      <td>
                        <input type="number" min="0" max="31" />
                      </td>
                      <td>
                        <input type="number" min="0" max="31" />
                      </td>
                    </tr>
                    <tr>
                      <td>EV</td>
                      <td>
                        <input type="number" min="0" max="252" />
                      </td>
                      <td>
                        <input type="number" min="0" max="252" />
                      </td>
                      <td>
                        <input type="number" min="0" max="252" />
                      </td>
                      <td>
                        <input type="number" min="0" max="252" />
                      </td>
                      <td>
                        <input type="number" min="0" max="252" />
                      </td>
                      <td>
                        <input type="number" min="0" max="252" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ) : null}
        </div>
        <div className="buttons"></div>
      </CloseablePopup>
    );
  }
}
