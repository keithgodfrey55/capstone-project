import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import pokemonPage from "./pokemonPage";
import Button from "@material-ui/core/Button";
import PokemonData from "./pokenames";
import numberSelect from "../validation/numberValidate";

class PokemonNumber extends React.Component {
  constructor(props) {
    const pokeID = "";
    super(props);
    this.state = {
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
      pokeNumbers: []
    };
  }
  componentDidMount() {
    axios.get(`https://pokeapi.co/api/v2/generation/1/`)
    .then((res)=>{     
      this.setState({pokemonSpecies: res.data.pokemon_species});
    } ) 
  }

  getPokemonNumber(event) {
    event.preventDefault();
    let state_value = this.state;
    this.state_value.pokemonInfo.error = numberSelect(state_value.pokemonInfo.number)
    if(state_value.input.error !== ""){
      return state_value.pokemonInfo.error;
    }
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonInfo.id}`)
    .then((response) => {
      let pokemonData = response.data;
        this.setState({ rawData: pokemonData });
        this.pokeID = this.state.rawData.id;
        console.log(this.state.rawData);
        console.log(this.pokeID);
        return this.pokeID;
    })

  }

  updateForm(which, event) {
    let myArray = [];
    let regex = new RegExp (`^${event.target.value}`)
    for(let x = 0;x < this.state.pokemonSpecies.length; x++){
      if(regex.exec(this.state.pokemonSpecies[x].number)){
        // this.setState({pokeNames:[ ...this.state.pokeNames, this.state.pokemonSpecies[x].name]})
        myArray.push(this.state.pokemonSpecies[x].number);
      }
    }
  }

  render() {
    return (
      <form onSubmit={(event) => {
        this.getPokemonNumber(event);
      }}>
      <Grid container spacing={3}>
        <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            inputProps={{ min: 1, max: 151 }}
            placeholder="search by #"
            onChange={(event) => {
              this.updateForm("pokemonInfo", event);
            }}
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
export default PokemonNumber
