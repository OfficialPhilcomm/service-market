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
    formValid: false,
  };

  validateForm = () => {
    const values = [
      this.inputIVHP.value,
      this.inputIVAtk.value,
      this.inputIVDef.value,
      this.inputIVSpAtk.value,
      this.inputIVSpDef.value,
      this.inputIVSpeed.value,
      this.inputEVHP.value,
      this.inputEVAtk.value,
      this.inputEVDef.value,
      this.inputEVSpAtk.value,
      this.inputEVSpDef.value,
      this.inputEVSpeed.value,
    ];

    let isValid = true;

    for (let value of values) {
      if (value === "" || value < 0) isValid = false;
    }

    this.setState({ formValid: isValid });
  };

  async componentDidMount() {
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

  createOrder = async () => {
    BackendAPI.createOrder(this.context.auth_token, {
      pokemon_name: this.selectPokemon.value,
      gender: "Male",
      level: parseInt(this.selectLevel.value),
      ability: this.selectAbility.value,

      move1: this.selectMove1.value,
      move2: this.selectMove2.value,
      move3: this.selectMove3.value,
      move4: this.selectMove4.value,

      iv_hp: parseInt(this.inputIVHP.value),
      iv_atk: parseInt(this.inputIVAtk.value),
      iv_def: parseInt(this.inputIVDef.value),
      iv_spatk: parseInt(this.inputIVSpAtk.value),
      iv_spdef: parseInt(this.inputIVDef.value),
      iv_spe: parseInt(this.inputIVSpeed.value),

      ev_hp: parseInt(this.inputEVHP.value),
      ev_atk: parseInt(this.inputEVAtk.value),
      ev_def: parseInt(this.inputEVDef.value),
      ev_spatk: parseInt(this.inputEVSpAtk.value),
      ev_spdef: parseInt(this.inputEVDef.value),
      ev_spe: parseInt(this.inputEVSpeed.value),
    });

    this.props.closeCallback();
  };

  render() {
    const p = this.state.p;

    return (
      <CloseablePopup closeCallback={this.props.closeCallback}>
        <div className="content">
          <div className="create-row">
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
            <span>lvl</span>
            <select ref={(select) => (this.selectLevel = select)}>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          {p ? (
            <React.Fragment>
              <div className="create-row">
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
                <select ref={(select) => (this.selectItem = select)}>
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
                        <input
                          ref={(input) => (this.inputIVHP = input)}
                          type="number"
                          min="0"
                          max="31"
                          onChange={this.validateForm}
                        />
                      </td>
                      <td>
                        <input
                          ref={(input) => (this.inputIVAtk = input)}
                          type="number"
                          min="0"
                          max="31"
                          onChange={this.validateForm}
                        />
                      </td>
                      <td>
                        <input
                          ref={(input) => (this.inputIVDef = input)}
                          type="number"
                          min="0"
                          max="31"
                          onChange={this.validateForm}
                        />
                      </td>
                      <td>
                        <input
                          ref={(input) => (this.inputIVSpAtk = input)}
                          type="number"
                          min="0"
                          max="31"
                          onChange={this.validateForm}
                        />
                      </td>
                      <td>
                        <input
                          ref={(input) => (this.inputIVSpDef = input)}
                          type="number"
                          min="0"
                          max="31"
                          onChange={this.validateForm}
                        />
                      </td>
                      <td>
                        <input
                          ref={(input) => (this.inputIVSpeed = input)}
                          type="number"
                          min="0"
                          max="31"
                          onChange={this.validateForm}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>EV</td>
                      <td>
                        <input
                          ref={(input) => (this.inputEVHP = input)}
                          type="number"
                          min="0"
                          max="252"
                          onChange={this.validateForm}
                        />
                      </td>
                      <td>
                        <input
                          ref={(input) => (this.inputEVAtk = input)}
                          type="number"
                          min="0"
                          max="252"
                          onChange={this.validateForm}
                        />
                      </td>
                      <td>
                        <input
                          ref={(input) => (this.inputEVDef = input)}
                          type="number"
                          min="0"
                          max="252"
                          onChange={this.validateForm}
                        />
                      </td>
                      <td>
                        <input
                          ref={(input) => (this.inputEVSpAtk = input)}
                          type="number"
                          min="0"
                          max="252"
                          onChange={this.validateForm}
                        />
                      </td>
                      <td>
                        <input
                          ref={(input) => (this.inputEVSpDef = input)}
                          type="number"
                          min="0"
                          max="252"
                          onChange={this.validateForm}
                        />
                      </td>
                      <td>
                        <input
                          ref={(input) => (this.inputEVSpeed = input)}
                          type="number"
                          min="0"
                          max="252"
                          onChange={this.validateForm}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ) : null}
        </div>
        <div className="buttons">
          <button onClick={this.createOrder} disabled={!this.state.formValid}>
            Create
          </button>
        </div>
      </CloseablePopup>
    );
  }
}
