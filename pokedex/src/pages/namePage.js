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
      pId: "25",
      pAbilities: [],
      pType: [],
      pokeDescription: "",
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
      labels: {
        name: "",
        id: "",
        ability: "",
        type: "",
        description: ""
      }
      
    };
  }
  componentDidMount() {
    axios.get(`https://pokeapi.co/api/v2/generation/1/`).then((res) => {
      this.setState({ pokemonSpecies: res.data.pokemon_species });
    });
  }
  GetPokemonNames(event) {
    event.preventDefault();
    let first_call = axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonInfo.name}`);
    let second_call = axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.state.pokemonInfo.name}`);
    axios
      .all([first_call, second_call])
      .then(axios.spread((...responses) => {
        const resp_1 = responses[0];
        const resp_2 = responses[1];
        console.log("RESPONSE", responses);
        let pokemonData = resp_1.data;
        let flavorText = resp_2.data.flavor_text_entries.flavor_text;
        let state = this.state;
        // state.rawData = pokemonData;
        // state.pokeDescription = flavorText;
        console.log("FLAVORTEXT", flavorText);
        this.setState({rawData: pokemonData, pokeDescription: flavorText})
      }));
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
          labels: {name: "NAME",
                  id: "ID",
                  ability: "ABILITIES",
                  type: "TYPE",
                  description: "DESCRIPTION"
                }

        });
        
      });
  }

  

  render() {
    console.log(this.state.pType);
    console.log(this.state.pAbilities);
    console.log(this.state.pName);
    console.log(this.state.pId);
    return (
      <form
        onSubmit={(event) => {
          this.SearchPokemon(event);
          this.GetPokemonNames(event);
        }}
      >
        <Grid item align="center" xs={12}>
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
            <Grid item xs={1}></Grid>
            <Grid item xs={5} align="center">
              <img
                id="img"
                src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.pId}.png`}
              />
            </Grid>
            <Grid item xs={2} align="center">
              <h3>{this.state.labels.name}</h3>
              <p>{this.state.pName}</p>
              <h3>{this.state.labels.id}</h3>
              <p>{this.state.pId}</p>
              <h3>{this.state.labels.ability}</h3>
              
              {this.state.pAbilities.map((ability) => (
                <ul>
                <li>{ability}</li>
                </ul>
                ))}
              
              <h3>{this.state.labels.type}</h3>

              {this.state.pType.map((type) => (
                <ul>
                <li>{type}</li>
                </ul>
                ))}
              
              <h3>{this.state.labels.description}</h3>
              <p>{this.state.pokeDescription}</p>
            </Grid>         
          </Grid>
        </div>
      </form>
    );
  }
}
export default PokemonPage;
