import React from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import './App.css';

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <Grid container spacing={3} className='container'>
          
          <Grid item justify='center' xs={4} sm={4} md={4}>
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
