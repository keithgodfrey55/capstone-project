import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import '../css/pokePage.css'

class PokemonPage extends React.Component{
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
          .get(`https://pokeapi.co/api/v2/pokemon/1`)
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
        );
    }
}
export default PokemonPage;