import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

class pokemonPage extends React.Component{
    render(){
        return(
            <div>
                <Grid container spacing={3}>
                    <Grid item>
                        <img src = "https://pokeres.bastionbot.org/images/pokemon/1.png" />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default pokemonPage;