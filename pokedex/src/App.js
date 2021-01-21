import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import PokemonData from "./pokenames";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: "",
      pokemonInfo: {
        name: "",
        data: "",
      },
    };

    axios.get("https://pokeapi.co/api/v2/generation/1").then((response) => {
      let pokemonNames = response.data;
      let pokeNames = this.setState({ rawData: pokemonNames.pokemon_species });
    });
  }
  // getPokeInfo(name) {
  //   axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  //     .then((response) => {
  //     let pokemonNames = response.data;
  //     this.setState()
  //     console.log(this.state.pokemonInfo);
  //     });

  render() {
    // axios.get("https://pokeapi.co/api/v2/generation/1")
    // .then((response) => {
    // let pokemonNames = response.data;
    // this.setState({rawData: pokemonNames.pokemon_species});

    return (
      <form>
        <Grid container spacing={3}>
          
          <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
            <Autocomplete
              options={this.pokeNames}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="search by name"
                />
              )}
            />
          </Grid>
          <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
            <TextField fullWidth variant="outlined" placeholder="search by #" />
          </Grid>
          <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="search by type"
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}
export default App;
