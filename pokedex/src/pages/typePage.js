import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../css/pokePage.css";
import "../css/index.css";
import GetFlavorText from "./namePage";
import Bug from "../TypeImages/BugType.png";
import Dark from "../TypeImages/DarkType.png";
import Dragon from "../TypeImages/DragonType.png";
import Electric from "../TypeImages/ElectricType.png";
import Fairy from "../TypeImages/FairyType.png";
import Fighting from "../TypeImages/FightingType.png";
import Fire from "../TypeImages/FireType.png";
import Flying from "../TypeImages/FlyingType.png";
import Ghost from "../TypeImages/GhostType.png";
import Grass from "../TypeImages/GrassType.png";
import Ground from "../TypeImages/GroundType.png";
import Ice from "../TypeImages/IceType.png";
import Normal from "../TypeImages/NormalType.png";
import Poison from "../TypeImages/PoisonType.png";
import Psychic from "../TypeImages/PsychicType.png";
import Rock from "../TypeImages/RockType.png";
import Steel from "../TypeImages/SteelType.png";
import Water from "../TypeImages/WaterType.png";

class TypePage extends React.Component {
  type_tag_lookup = {
    bug: Bug,
    dark: Dark,
    dragon: Dragon,
    electric: Electric,
    fairy: Fairy,
    fighting: Fighting,
    fire: Fire,
    flying: Flying,
    ghost: Ghost,
    grass: Grass,
    ground: Ground,
    ice: Ice,
    normal: Normal,
    poison: Poison,
    psychic: Psychic,
    rock: Rock,
    steel: Steel,
    water: Water,
  };
  constructor(props) {
    super(props);
    this.state = {
      pName: "",
      pId: "25",
      pAbilities: [],

      pType: [],
      pTypeImgStorage: [
        Bug,
        Dark,
        Dragon,
        Electric,
        Fairy,
        Fighting,
        Fire,
        Flying,
        Ghost,
        Grass,
        Ground,
        Ice,
        Normal,
        Poison,
        Psychic,
        Rock,
        Steel,
        Water,
      ],
      pTypeImgStorage2: [
        "bug",
        "dark",
        "dragon",
        "electric",
        "fairy",
        "fighting",
        "fire",
        "flying",
        "ghost",
        "grass",
        "ground",
        "ice",
        "normal",
        "poison",
        "psychic",
        "rock",
        "steel",
        "water",
      ],
      pTypeImg: [],
      pokeDescription: "",
      rawData: "",
      pokemonInfo: {
        name: "",
        number: "",
        type: "",
        error: "",
      },
      pokemonSpecies: [
        {
          name: "",
          url: "",
        },
      ],
      pokeNames: [""],
      pokeNumber: [""],
      labels: {
        name: "",
        id: "",
        ability: "",
        type: "",
        description: "",
      },
      typeArray: [],
      allPokemonData: [],
    };
    this.randomNumber();
  }
  randomNumber() {
    let state = this.state;
    let number = Math.floor(Math.random() * 152) + 1;
    state.pId = String(number);
  }
  componentDidMount() {
    axios.get(`https://pokeapi.co/api/v2/generation/1/`).then((res) => {
      this.setState({ pokemonSpecies: res.data.pokemon_species });
    });
  }

  updateForm(which, value) {
    let myArray = [];
    let regex = new RegExp(`^${value}`);
    if (value !== "") {
      for (let x = 0; x < this.state.pokemonSpecies.length; x++) {
        if (regex.exec(this.state.pTypeImgStorage2[x])) {
          myArray.push(this.state.pTypeImgStorage2[x]);
        }
      }
    }
    this.setState({ pokeNames: myArray });
    this.setState({
      [which]: {
        type: value,
        error: this.state[which].error,
      },
    });
  }

  SearchPokemon(event) {
    event.preventDefault();
    let state = this.state;
    state.allPokemonData.splice(0, state.allPokemonData.length);
    for (let z = 0; z < this.state.typeArray.length; z++) {
      let first_call = axios.get(
        `https://pokeapi.co/api/v2/pokemon/${this.state.typeArray[z]}`
      );
      let second_call = axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${this.state.typeArray[z]}`
      );
      axios.all([first_call, second_call]).then(
        axios.spread((...responses) => {
          const response1 = responses[0];
          const response2 = responses[1];
          const pokemondata = {
            name: response1.data.species.name,
            id: response1.data.id,
            type: [],
            abilities: [],
            flavorText: response2.data.flavor_text_entries[1].flavor_text,
          };
          for (let x = 0; x < response1.data.abilities.length; x++) {
            pokemondata.abilities.push(
              response1.data.abilities[x].ability.name
            );
          }
          state.pTypeImg.splice(0, state.pTypeImg.length);
          for (let i = 0; i < response1.data.types.length; i++) {
            pokemondata.type.push(this.type_tag_lookup[response1.data.types[i].type.name]);
          }
          state.allPokemonData.push(pokemondata);
          this.setState({
            labels: {
              name: "NAME",
              id: "ID",
              ability: "ABILITIES",
              type: "TYPE",
              description: "DESCRIPTION",
            },
            allPokemonData: state.allPokemonData,
            pTypeImgStorage: state.pTypeImg,
          });
        })
      );
    }
    
  }
  DeterminePokemon(event) {
    event.preventDefault();
    let state = this.state;
    axios
      .get(`https://pokeapi.co/api/v2/type/${this.state.pokemonInfo.type}/`)
      .then((res) => {
        state.typeArray.splice(0, state.typeArray.length);
        for (let i = 0; i < res.data.pokemon.length; i++) {
          //Bug
          if (res.data.pokemon[i].pokemon.name === "ledyba") {
            break;
          }
          //Dragon
          else if (res.data.pokemon[i].pokemon.name === "kingdra") {
            break;
          }
          //Electric
          else if (res.data.pokemon[i].pokemon.name === "chinchou") {
            break;
          }
          //Fairy
          else if (res.data.pokemon[i].pokemon.name === "cleffa") {
            break;
          }
          //Fighting
          else if (res.data.pokemon[i].pokemon.name === "heracross") {
            break;
          }
          //Fire
          else if (res.data.pokemon[i].pokemon.name === "cyndaquil") {
            break;
          }
          //Flying
          else if (res.data.pokemon[i].pokemon.name === "hoothoot") {
            break;
          }
          //Ghost
          else if (res.data.pokemon[i].pokemon.name === "misdreavus") {
            break;
          }
          //Grass
          else if (res.data.pokemon[i].pokemon.name === "chikorita") {
            break;
          }
          //Ground
          else if (res.data.pokemon[i].pokemon.name === "wooper") {
            break;
          }
          //Ice
          else if (res.data.pokemon[i].pokemon.name === "sneasel") {
            break;
          }
          //Normal
          else if (res.data.pokemon[i].pokemon.name === "sentret") {
            break;
          }
          //Poison
          else if (res.data.pokemon[i].pokemon.name === "spinarak") {
            break;
          }
          //Psychic
          else if (res.data.pokemon[i].pokemon.name === "natu") {
            break;
          }
          //Rock
          else if (res.data.pokemon[i].pokemon.name === "sudowoodo") {
            break;
          }
          //Steel
          else if (res.data.pokemon[i].pokemon.name === "forretress") {
            break;
          }
          //Water
          else if (res.data.pokemon[i].pokemon.name === "totodile") {
            break;
          } else {
            state.typeArray.push(res.data.pokemon[i].pokemon.name);
          }
        }
      this.setState(state);
      this.SearchPokemon(event);
      });
      
  }

  render() {
    return (
      <div>
        <form
          onSubmit={(event) => {
            this.DeterminePokemon(event);
          }}
        >
          <Grid item align="center" xs={12}>
            <Autocomplete
              options={this.state.pokeNames}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  id="text"
                  {...params}
                  fullWidth
                  variant="outlined"
                  placeholder="search by type"
                  value={this.state.pokemonInfo.type}
                  error={this.state.pokemonInfo.error}
                />
              )}
              onInputChange={(event, value) => {
                if (event.type === "change") {
                  this.updateForm("pokemonInfo", event.target.value);
                }
                if (event.type === "click") {
                  this.updateForm("pokemonInfo", value);
                }
              }}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button id="text" type="submit" variant="contained">
              Search
            </Button>
          </Grid>
          {this.state.allPokemonData.map((pokemondata, index) => (
              <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={5} align="center">
                  <img
                    id="img"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemondata.id}.png`}
                  />
                </Grid>
                <Grid item xs={6} align="center">
                  <h3>{this.state.labels.name}</h3>
                  <p>{pokemondata.name}</p>
                  <h3>{this.state.labels.id}</h3>
                  <p>{pokemondata.id}</p>
                  <h3>{this.state.labels.ability}</h3>
                  {pokemondata.abilities.map((ability) => (
                    <li>{ability}</li>
                  ))}
                  <h3>{this.state.labels.type}</h3>
                  {pokemondata.type.map((tag, index) => (
                    <img id="typeSizing" key={index} src={tag} />
                  ))}
                  <h3>{this.state.labels.description}</h3>
                  <p>{pokemondata.flavorText}</p>
                </Grid>
              </Grid>
          ))}
        </form>
      </div>
    );
  }
}
export default TypePage;
