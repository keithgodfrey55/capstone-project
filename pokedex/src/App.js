import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./App.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: '',
      pokemonInfo: {
        name: "",
        data: "",
      },
    };
  
  }

  render() {
    axios.get("https://pokeapi.co/api/v2/generation/1")
    .then((response) => {
    let pokemonNames = response.data;
    this.setState({rawData: pokemonNames.pokemon_species});
    });
    
    return (
      <div className="App">
        <Grid container spacing={3} className="container">
          <form> 
          <Grid item align="center" xs={4} sm={4} md={4}>
            <TextField variant="outlined" placeholder="search by #" />
          </Grid>
          <Grid item align="center" xs={4} sm={4} md={4}>
            <TextField variant="outlined" placeholder="search by name" />
          </Grid>
          <Grid item align="center" xs={4} sm={4} md={4}>
            <TextField variant="outlined" placeholder="search by type" />
          </Grid>
          </form>
        </Grid>
      </div>
    );
  }
}
export default App;
