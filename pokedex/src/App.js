import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import pokemonPage from "./pokemonPage";
import Button from "@material-ui/core/Button";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: "",
      pokemonInfo: {
        name: "",
        data: "",
        error: ""
      },
    };
  }
  getPokemonNames(event) {
    event.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonInfo.name}`)
      .then((response) => {
        let pokemonNames = response.data;
        this.setState({ rawData: pokemonNames });
      });
    console.log(this.state.rawData);
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
      <div className="App">
        <Grid container spacing={3} className="container">
          <form
            onSubmit={(event) => {
              this.getPokemonNames(event);
            }}
          >
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
                  this.updateForm('pokemonInfo.name',event);
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
            <Button></Button>
          </form>
        </Grid>
      </div>
    );
  }
}
export default App;
