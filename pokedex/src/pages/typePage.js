import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../css/pokePage.css";
import GetFlavorText from "./namePage"
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
      pTypeImgStorage2: ["bug","dark","dragon","electric","fairy","fighting",
        "fire","flying","ghost","grass","ground","ice","normal","poison","psychic",
        "rock","steel","water"],
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
        description: ""
      },
      typeArray: [],
      
    };
    this.randomNumber();
  }
  randomNumber(){
    let state = this.state;
    let number = Math.floor(Math.random()* 152)+1;
    state.pId = String(number);

  }
  componentDidMount() {
    axios.get(`https://pokeapi.co/api/v2/generation/1/`).then((res) => {
      this.setState({ pokemonSpecies: res.data.pokemon_species });
    });
  }
  GetFlavorText(event) {
    event.preventDefault();
    let first_call = axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonInfo.name}`);
    let second_call = axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.state.pokemonInfo.name}`);
    axios
      .all([first_call, second_call])
      .then(axios.spread((...responses) => {
        const resp_1 = responses[0];
        const resp_2 = responses[1];
        let pokemonData = resp_1.data;
        let flavorText = resp_2.data.flavor_text_entries[1].flavor_text;
        this.setState({rawData: pokemonData, pokeDescription: flavorText})
      }));
  }
  
  updateForm(which, value) {
    let myArray = [];
    let regex = new RegExp(`^${value}`);
    for (let x = 0; x < this.state.pokemonSpecies.length; x++) {
      if (regex.exec(this.state.pTypeImgStorage2[x])) {
        myArray.push(this.state.pTypeImgStorage2[x]);
      }
    }
    this.setState({ pokeNames: myArray });
    console.log(this.state.pokeNames);
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
          pokemonInfo: {id: response.data.id},
          labels: {name: "NAME",
                  id: "ID",
                  ability: "ABILITIES",
                  type: "TYPE",
                  description: "DESCRIPTION"
                },
          pTypeImgStorage: state.pTypeImg
        });
        
      });
  }
  DeterminePokemon(event) {
    
    let state = this.state;
    axios.get(`https://pokeapi.co/api/v2/type/${this.state.pokemonInfo.type}/`).then((res) => {
      
      for(let i=0; i<res.data.pokemon.length; i++) {
        //Bug
        if(res.data.pokemon[i].pokemon.name === "ledyba") {
          break;
        }
        //Dragon
        else if(res.data.pokemon[i].pokemon.name === "kingdra"){
          break;
        }
        //Electric
        else if(res.data.pokemon[i].pokemon.name === "chinchou"){
          break;
        }
        //Fairy
        else if(res.data.pokemon[i].pokemon.name === "cleffa"){
          break;
        }
        //Fighting
        else if(res.data.pokemon[i].pokemon.name === "heracross"){
          break;
        }
        //Fire
        else if(res.data.pokemon[i].pokemon.name === "cyndaquil"){
          break;
        }
        //Flying
        else if(res.data.pokemon[i].pokemon.name === "hoothoot"){
          break;
        }
        //Ghost
        else if(res.data.pokemon[i].pokemon.name === "misdreavus"){
          break;
        }
        //Grass
        else if(res.data.pokemon[i].pokemon.name === "chikorita"){
          break;
        }
        //Ground
        else if(res.data.pokemon[i].pokemon.name === "wooper"){
          break;
        }
        //Ice
        else if(res.data.pokemon[i].pokemon.name === "sneasel"){
          break;
        }
        //Normal
        else if(res.data.pokemon[i].pokemon.name === "sentret"){
          break;
        }
        //Poison
        else if(res.data.pokemon[i].pokemon.name === "spinarak"){
          break;
        }
        //Psychic
        else if(res.data.pokemon[i].pokemon.name === "natu"){
          break;
        }
        //Rock
        else if(res.data.pokemon[i].pokemon.name === "sudowoodo"){
          break;
        }
        //Steel
        else if(res.data.pokemon[i].pokemon.name === "forretress"){
          break;
        }
        //Water
        else if(res.data.pokemon[i].pokemon.name === "totodile"){
          break;
        }
        else{
          state.typeArray.push(res.data.pokemon[i].pokemon.name);
        }
      }
      
      console.log(res.data);
    });
  }

  render() {
    const tagImages = this.state.pTypeImgStorage.map((tag, index) => {
      return <img id="typeSizing" key={index} src={tag} />;
    });
    return (
      <form
        onSubmit={(event) => {
          // this.SearchPokemon(event);
          // GetFlavorText(event);
          this.DeterminePokemon(event);
          this.SearchPokemon(event);
          this.GetFlavorText(event);
          
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
                // user has typed in
                this.updateForm("pokemonInfo", event.target.value);
              }
              if (event.type === "click") {
                // user has clicked
                this.updateForm("pokemonInfo", value);
              }
            }}
          />
          <Autocomplete
            options={this.state.typeArray}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField 
                id="text"
                {...params}
                fullWidth
                variant="outlined"
                placeholder="search pokemon with given type"
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
          <Button id="text" type="submit" variant="contained">
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
            
            <Grid item xs={6} align="center">
              <h3>{this.state.labels.name}</h3>
              <p>{this.state.pName}</p>
              <h3>{this.state.labels.id}</h3>
              <p>{this.state.pokemonInfo.id}</p>
              <h3>{this.state.labels.ability}</h3>
              {this.state.pAbilities.map((ability) => (
                <li>{ability}</li>
              ))}
              <h3>{this.state.labels.type}</h3>
              {tagImages}
              <h3>{this.state.labels.description}</h3>
              <p>{this.state.pokeDescription}</p>
            </Grid>        
          </Grid>
        </div>
      </form>
    );
  }
}
export default TypePage;
