import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import Grid from "@material-ui/core/Grid";
import PokemonPage from "./pages/pokemonPage"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Grid container>
      <Grid item xs={12} align="center">
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/62902855-31e8-48de-986e-5080e8ef5f15/d5uxsvu-cbf56dfe-0c82-40f9-928b-1e756acf0236.png/v1/fill/w_312,h_112,strp/pokedex_vector_logo_by_macoscrazy_d5uxsvu-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMTIiLCJwYXRoIjoiXC9mXC82MjkwMjg1NS0zMWU4LTQ4ZGUtOTg2ZS01MDgwZThlZjVmMTVcL2Q1dXhzdnUtY2JmNTZkZmUtMGM4Mi00MGY5LTkyOGItMWU3NTZhY2YwMjM2LnBuZyIsIndpZHRoIjoiPD0zMTIifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.daudD2Eg6CKty-X3Ecc7TohhgtPMxWj0KkqSTBSLvAc" />
      </Grid>
    </Grid>

    <App />
    <PokemonPage />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
