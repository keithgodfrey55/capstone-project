import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import pokemonPage from "./pokemonPage";
import Button from "@material-ui/core/Button";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    const pokeID = '';
    super(props);
    this.state = {
      rawData: "",
      pokemonInfo: {
        name: "",
        number: "",
        error: "",
      },
    };
  }
  getPokemonNames(event) {
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
      console.log(this.pokeID);
  }

  updateForm(which, event) {
    this.setState({
      [which]: {
        name: event.target.value,
        error: this.state[which].error,
      },
    });
  }
  render() {
    return (
        <form
          onSubmit={(event) => {
            this.getPokemonNames(event);
          }}
        >
          <Grid container spacing={3}>
            <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="search by #"
              />
            </Grid>
            <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="search by name"
                value={this.state.pokemonInfo.name}
                error={this.state.pokemonInfo.error}
                onChange={(event) => {
                  this.updateForm("pokemonInfo", event);
                }}
              />
            </Grid>
            <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="search by type"
              />
            </Grid>
            <Grid item xs={12} align='center'>
            <Button type='submit' variant='contained'>Search</Button>
            </Grid>
          </Grid>
        </form>
    );
  }
}
export default App;
