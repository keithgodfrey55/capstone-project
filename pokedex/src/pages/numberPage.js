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

class NumberPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          pName: "",
          pId: "25",
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
          labels: {
            name: "",
            id: "",
            ability: "",
            type: ""
    
          } 
        };
      }
      PokeNumArray(){
          let state = this.state;
        for(let x = 1; x <= 151; x++){
           state.pokeNumber.push(String(x))
        }
      }
     
    // componentDidMount() {
    //     let state = this.state;
    //     axios
    //       .get(`https://pokeapi.co/api/v2/pokemon/${state}`)
    //       .then((response) => { console.log(response)
    //         this.setState({pName: response.data.species.name, pId: response.data.id})
    //         for(let x = 0; x < response.data.abilities.length; x++){
    //             state.pAbilities.push(response.data.abilities[x].ability.name)
    //         }
    //         for(let i = 0; i < response.data.types.length; i++){
    //             state.pType.push(response.data.types[i].type.name)
    //         }
           
    //       });
          
    //   }
      
    render(){
       console.log(this.state.pokeNumber);

        return(
        <form
          onSubmit={(event) => {
            this.GetPokemonNames(event);
          }}
        >
            <Grid container spacing={3}>
                <Grid item align="center" xs={4} sm={4} md={4} lg={4} xl={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        inputProps = {{min: 1, max: 151}}
                        placeholder="search by #"
                    />
                </Grid>
            </Grid>
            <div>
                <Grid container spacing={3}>
                    <Grid item>
                    <p>{this.state.pName}</p>
                    <p>{this.state.pAbilities}</p>
                    </Grid>
                    <Grid item>
                        <img id='img' src = "https://pokeres.bastionbot.org/images/pokemon/1.png" />
                    </Grid>

                </Grid>
            </div>
        </form>
        );
    }
}
export default NumberPage;
