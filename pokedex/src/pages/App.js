import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import PokemonPage from "./pokemonPage";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../css/App.css";

class App extends React.Component {
  constructor(props) {
    const pokeID = '';
    let pokemonid = [];
    super(props);
    this.state = {
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
  componentDidMount(){
    axios.get(`https://pokeapi.co/api/v2/generation/1/`)
    .then((res)=>{
      this.setState({pokemonSpecies: res.data.pokemon_species});
    } ) 
    // axios
    //   .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonInfo.number}`)
    //   .then((response) => {
    //     this.setState({pokemonInfo: {number: response.data.id}})
    //   })
  }
 GetPokeNumbers(pokemonid){
    for(let x = 1; x <= 151; x++){
        pokemonid.push(x);
    }console.log(pokemonid);
    return pokemonid;
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
    
  // getPokeInfo(name) {
  //   axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  //     .then((response) => {
  //     let pokemonNames = response.data;
  //     this.setState()
  //     console.log(this.state.pokemonInfo);
  //     });

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
    return (
        <form
          onSubmit={(event) => {
            this.GetPokemonNames(event);
          }}
        >
          <Grid container spacing={3}>
            <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
            <Autocomplete
              options={this.state.pokeNames}
              getOptionLabel = {(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                {...params}
                  fullWidth
                  variant="outlined"
                  placeholder="search by id"
                  value = {this.state.pokemonInfo.number}
                error={this.state.pokemonInfo.error}
                onChange={(event) => {
                  this.updateForm("pokemonInfo", event);
                }}
                />
              )}
            />
            </Grid>
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
          <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="search by type"
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}
export default App;
