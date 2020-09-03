import React, { Component } from "react";
import CloseablePopup from "../CloseablePopup";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import PokeAPI from "../../../api/PokeAPI";
import StringUtils from "../../../api/StringUtils";
import "./CreateOrderPopup.css";
import BackendAPI from "../../../api/BackendAPI";

export default class CreateOrderPopup extends Component {
  static contextType = ApplicationContext;

  state = {
    p: null,
    createError: null,
  };

  async componentDidMount() {
    this.handleCreateOrder = this.handleCreateOrder.bind(this);
    const pokemon = await PokeAPI.getAdvancedData(0);
    this.setState({ p: pokemon });
  }

  switchPokemon = (event) => {
    const index = parseInt(this.selectPokemon.selectedIndex);
    this.displayPokemonData(index);
  };

  displayPokemonData = async (index) => {
    const pokemon = await PokeAPI.getAdvancedData(index);
    this.setState({ p: pokemon });
  };

  handleCreateOrder = async (event) => {
    event.preventDefault();

    const args = {
      pokemon_name: this.selectPokemon.value,
      gender: "Male",
      level: parseInt(this.selectLevel.value),
      ability: this.selectAbility.value,
      item: this.selectItem.value,

      move1: this.selectMove1.value,
      move2: this.selectMove2.value,
      move3: this.selectMove3.value,
      move4: this.selectMove4.value,

      iv_hp: parseInt(this.inputIVHP.value),
      iv_atk: parseInt(this.inputIVAtk.value),
      iv_def: parseInt(this.inputIVDef.value),
      iv_spatk: parseInt(this.inputIVSpAtk.value),
      iv_spdef: parseInt(this.inputIVSpDef.value),
      iv_spe: parseInt(this.inputIVSpeed.value),

      ev_hp: parseInt(this.inputEVHP.value),
      ev_atk: parseInt(this.inputEVAtk.value),
      ev_def: parseInt(this.inputEVDef.value),
      ev_spatk: parseInt(this.inputEVSpAtk.value),
      ev_spdef: parseInt(this.inputEVSpDef.value),
      ev_spe: parseInt(this.inputEVSpeed.value),
    };

    const result = await BackendAPI.createOrder(this.context.auth_token, args);

    if (result.success) {
      this.props.closeCallback();
    } else {
      this.setState({ createError: result.error });
    }
  };

  render() {
    const p = this.state.p;

    return (
      <CloseablePopup closeCallback={this.props.closeCallback}>
        <div className="content">
          <form onSubmit={this.handleCreateOrder}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <select
                      onChange={this.switchPokemon}
                      ref={(select) => (this.selectPokemon = select)}
                    >
                      {PokeAPI.pokemonList.map((pokemon, index) => (
                        <option value={pokemon.name} key={index}>
                          {StringUtils.humanize(pokemon.name)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>lvl</td>
                  <td>
                    <select ref={(select) => (this.selectLevel = select)}>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            {p ? (
              <React.Fragment>
                <table>
                  <tbody>
                    <tr>
                      <td>Ability</td>
                      <td>
                        <select ref={(select) => (this.selectAbility = select)}>
                          {p.data.abilities.map((ability) => (
                            <option
                              value={ability.ability.name}
                              key={ability.ability.name}
                            >
                              {StringUtils.humanize(ability.ability.name)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Item</td>
                      <td>
                        <select ref={(select) => (this.selectItem = select)}>
                          {PokeAPI.itemList.map((item) => (
                            <option value={item.name} key={item.name}>
                              {StringUtils.humanize(item.name)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td colSpan={2}>Moves</td>
                    </tr>
                    <tr>
                      <td>
                        <select ref={(select) => (this.selectMove1 = select)}>
                          {p.data.moves.map((move) => (
                            <option value={move.move.name} key={move.move.name}>
                              {StringUtils.humanize(move.move.name)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select ref={(select) => (this.selectMove2 = select)}>
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
                        <select ref={(select) => (this.selectMove3 = select)}>
                          {p.data.moves.map((move) => (
                            <option value={move.move.name} key={move.move.name}>
                              {StringUtils.humanize(move.move.name)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select ref={(select) => (this.selectMove4 = select)}>
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
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputIVHP = input)}
                          type="number"
                          required
                          min="0"
                          max="31"
                          placeholder="0-31"
                        />
                      </td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputIVAtk = input)}
                          type="number"
                          required
                          min="0"
                          max="31"
                          placeholder="0-31"
                        />
                      </td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputIVDef = input)}
                          type="number"
                          required
                          min="0"
                          max="31"
                          placeholder="0-31"
                        />
                      </td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputIVSpAtk = input)}
                          type="number"
                          required
                          min="0"
                          max="31"
                          placeholder="0-31"
                        />
                      </td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputIVSpDef = input)}
                          type="number"
                          required
                          min="0"
                          max="31"
                          placeholder="0-31"
                        />
                      </td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputIVSpeed = input)}
                          type="number"
                          required
                          min="0"
                          max="31"
                          placeholder="0-31"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>EV</td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputEVHP = input)}
                          type="number"
                          required
                          min="0"
                          max="252"
                          placeholder="0-252"
                        />
                      </td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputEVAtk = input)}
                          type="number"
                          required
                          min="0"
                          max="252"
                          placeholder="0-252"
                        />
                      </td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputEVDef = input)}
                          type="number"
                          required
                          min="0"
                          max="252"
                          placeholder="0-252"
                        />
                      </td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputEVSpAtk = input)}
                          type="number"
                          required
                          min="0"
                          max="252"
                          placeholder="0-252"
                        />
                      </td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputEVSpDef = input)}
                          type="number"
                          required
                          min="0"
                          max="252"
                          placeholder="0-252"
                        />
                      </td>
                      <td>
                        <input
                          className="input-stat validation"
                          ref={(input) => (this.inputEVSpeed = input)}
                          type="number"
                          required
                          min="0"
                          max="252"
                          placeholder="0-252"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                {this.state.createError ? (
                  <div className="create-error">{this.state.createError}</div>
                ) : null}
                <input type="submit" value="Create Order" />
              </React.Fragment>
            ) : null}
          </form>
        </div>
      </CloseablePopup>
    );
  }
}
