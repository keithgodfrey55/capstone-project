import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../css/pokePage.css";
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

class PokemonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pName: "",
      pId: "",
      pAbilities: [],
      pType: [],
      pTypeImgStorage: [Bug,Dark,Dragon,Electric,Fairy,Fighting,
        Fire,Flying,Ghost,Grass,Ground,Ice,Normal,Poison,Psychic,Rock,Steel,Water],
      pTypeImg: [],
      rawData: "",
      pokemonInfo: {
        name: "",
        number: "",
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
    };
  }
  componentDidMount() {
    axios.get(`https://pokeapi.co/api/v2/generation/1/`).then((res) => {
      this.setState({ pokemonSpecies: res.data.pokemon_species });
    });
  }
  GetPokemonNames(event) {
    event.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonInfo.name}`)
      .then((response) => {
        let pokemonData = response.data;
        this.setState({ rawData: pokemonData });
      });
  }
  updateForm(which, value) {
    let myArray = [];
    let regex = new RegExp(`^${value}`);
    for (let x = 0; x < this.state.pokemonSpecies.length; x++) {
      if (regex.exec(this.state.pokemonSpecies[x].name)) {
        myArray.push(this.state.pokemonSpecies[x].name);
      }
    }
    this.setState({ pokeNames: myArray });
    console.log(this.state.pokeNames);
    this.setState({
      [which]: {
        name: value,
        error: this.state[which].error,
      },
    });
  }

  SearchPokemon(event) {
    event.preventDefault();
    let state = this.state;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonInfo.name}`)
      .then((response) => {
        console.log(response);

        for (let x = 0; x < 3; x++) {
          state.pAbilities.pop(state.pAbilities[x]);
        }
        for (let i = 0; i < 2; i++) {
          state.pType.pop(state.pType[i]);
        }
        for (let x = 0; x < response.data.abilities.length; x++) {
          state.pAbilities.push(response.data.abilities[x].ability.name);
        }
        for (let i = 0; i < response.data.types.length; i++) {
          state.pType.push(response.data.types[i].type.name);
        }
        this.setState({
          pName: response.data.species.name,
          pId: response.data.id,
        });
      });
      this.AssignTypeImg();
  }
  AssignTypeImg(){
    let state = this.state;
    for (let i = 0; i < 2; i++) {
      state.pTypeImg.pop(state.pTypeImg[i]);
    }
    for(let x = 0;x < state.pType.length; x++){
      for(let i = 0; i < state.pTypeImg.length; i++){
        if(state.pType[x] === state.pTypeImgStorage[i]){
          state.pTypeImg.push(state.pTypeImgStorage[i]);
        }
      }
    }
  }

  render() {
    console.log(this.state.pType);
    console.log(this.state.pAbilities);
    console.log(this.state.pName);
    console.log(this.state.pId);
    console.log(this.state.pTypeImg)
    return (
      <form
        onSubmit={(event) => {
          this.SearchPokemon(event);
        }}
      >
        <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
          <Autocomplete
            options={this.state.pokeNames}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                placeholder="search by name"
                value={this.state.pokeNames}
                error={this.state.pokemonInfo.error}
              />
            )}
            onInputChange={(event, value) => {
              if (event.type === "change") {
                // user has typed in
                this.updateForm("pokemonInfo", event.target.value);
              }
              if (event.type === "click") {
                // user has clicked
                this.updateForm("pokemonInfo", value);
              }
            }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Grid>
        <div>
          <Grid container spacing={3}>
            <Grid item>
              <p>{this.state.pName}</p>
              <p>{this.state.pId}</p>
              <p>{this.state.pAbilities}</p>
              <p>{this.state.pType}</p>
              
            </Grid>
            <Grid item>
              <img
                id="img"
                src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.pId}.png`}
              />
            </Grid>
          </Grid>
        </div>
      </form>
    );
  }
}
export default PokemonPage;
