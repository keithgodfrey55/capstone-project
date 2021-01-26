import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography"
import "../css/App.css";
import "../css/pokePage.css";

class App extends React.Component {
  constructor(props) {
    // const pokeID = '';
    // let pokemonid = [];
    super(props);
    this.state = {
      x:""
    };
    this.randomNumber();
  }
      
  randomNumber(){
    let state = this.state;
    let number = Math.floor(Math.random()* 152)+1;
    state.x = String(number);

  }
  render() {
    return (
    <div>
      <Grid container>
        <Grid item xs={12} align="center">
          <Typography variant="h2">Welcome!</Typography>
        </Grid>
        <Grid item xs={12} align="center"><img
                id="imgHome"
                src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.x}.png`} alt="pokemon"
              /></Grid>
      </Grid>
    </div>
    );
  }
}
export default App;
