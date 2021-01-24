import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../css/pokePage.css";

class PokemonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pName: "",
      pId: "",
      pAbilities: [""],
      pType: [""],
      rawData: "",
      pokemonInfo: {
        name: "",
        number: "",
        error: "",
      },
      pokemonSpecies:[{ 
        name:'',
        url:''
      }],
      pokeNames:[''],
      pokeNumber: ['']
    };
  }
  componentDidMount() {
    let state = this.state;
    axios.get(`https://pokeapi.co/api/v2/pokemon/1`).then((response) => {
      console.log(response);
      this.setState({
        pName: response.data.species.name,
        pId: response.data.id,
      });
      for (let x = 0; x < response.data.abilities.length; x++) {
        state.pAbilities.push(response.data.abilities[x].ability.name);
      }
      for (let i = 0; i < response.data.types.length; i++) {
        state.pType.push(response.data.types[i].type.name);
      }
    });
  }

  GetPokemonNames(event) {
    event.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonInfo.name}`)
      .then((response) => {
        let pokemonData = response.data;
        this.setState({ rawData: pokemonData });
        this.pokeID = this.state.rawData.id;
        console.log(this.state.rawData);
        console.log(this.pokeID);
        return this.pokeID;
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

  render() {
    console.log(this.state.pType);
    console.log(this.state.pAbilities);
    console.log(this.state.pName);
    console.log(this.state.pId);
    return (
      <form onSubmit={(event) => {
        this.GetPokemonNames(event);
      }}>
        <div>
          <Grid container spacing={3}>
            <Grid item>
              <p>{this.state.pName}</p>
              <p>{this.state.pAbilities}</p>
            </Grid>
            <Grid item>
              <img
                id="img"
                src="https://pokeres.bastionbot.org/images/pokemon/1.png"
              />
            </Grid>
          </Grid>
        </div>
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
      </form>
    );
  }
}
export default PokemonPage;
