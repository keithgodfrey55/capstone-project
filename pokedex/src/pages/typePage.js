import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";


import '../css/pokePage.css';

class TypePage extends React.Component {
    constructor(props){
        super(props)
        this.state={
            pName:'',
            pId: '',
            pAbilities: [''],
            pType: ['']

        }
    }
    componentDidMount() {
        let state = this.state;
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${state}`)
          .then((response) => { console.log(response)
            this.setState({pName: response.data.species.name, pId: response.data.id})
            for(let x = 0; x < response.data.abilities.length; x++){
                state.pAbilities.push(response.data.abilities[x].ability.name)
            }
            for(let i = 0; i < response.data.types.length; i++){
                state.pType.push(response.data.types[i].type.name)
            }
           
          });
          
      }
      
    render(){
        console.log(this.state.pType)
          console.log(this.state.pAbilities)
          console.log(this.state.pName)
          console.log(this.state.pId)

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
export default TypePage;
