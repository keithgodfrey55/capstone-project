import React from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import './App.css';
const Request = require('request');

class App extends React.Component{
constructor(props){
  super(props);
  axios.get('https://pokeapi.co/api/v2/generation/1')
  .then(response => { 
    const poke = response.data;
     console.log(poke.pokemon_species); 
    })
  
  this.state={
    text: ''
  }
}



  render(){
    return (
      <div className="App">
        <Grid container spacing={3} className='container'>
          
          <Grid item align='center' xs={4} sm={4} md={4}>
          <TextField variant='outlined' placeholder='search by #' />
          </Grid>
          <Grid item align='center' xs={4} sm={4} md={4}>
          <TextField variant='outlined' placeholder='search by name' />
          </Grid>
          <Grid item align='center' xs={4} sm={4} md={4}>
          <TextField variant='outlined' placeholder='search by type' />
          </Grid>
         
        </Grid>
      </div>
    );
  }
  
}
export default App;
