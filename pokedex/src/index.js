import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./css/pokePage.css";
import App from "./pages/App";
import Button from "@material-ui/core/Button";
import reportWebVitals from "./reportWebVitals";
import Grid from "@material-ui/core/Grid";
import PokemonPage from "./pages/namePage";
import NumberPage from "./pages/numberPage";
import TypePage from "./pages/typePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Grid container id="home">
        <Grid item xs={12} align="center">
          <Link to="/">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/62902855-31e8-48de-986e-5080e8ef5f15/d5uxsvu-cbf56dfe-0c82-40f9-928b-1e756acf0236.png/v1/fill/w_312,h_112,strp/pokedex_vector_logo_by_macoscrazy_d5uxsvu-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMTIiLCJwYXRoIjoiXC9mXC82MjkwMjg1NS0zMWU4LTQ4ZGUtOTg2ZS01MDgwZThlZjVmMTVcL2Q1dXhzdnUtY2JmNTZkZmUtMGM4Mi00MGY5LTkyOGItMWU3NTZhY2YwMjM2LnBuZyIsIndpZHRoIjoiPD0zMTIifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.daudD2Eg6CKty-X3Ecc7TohhgtPMxWj0KkqSTBSLvAc"
              alt="pokedex"
            />
          </Link>
        </Grid>
      </Grid>
      <div>
        <nav>
          <Grid container id="textMenu" spacing={2} justify="center">
            {/* <Grid item xs={12} sm={6} md={3} lg={3} align="center">
              <Button id="text" variant="contained">
                <Link to="/">Home</Link>
              </Button>
            </Grid> */}
            <Grid item xs={12} sm={6} md={4} lg={4} align="center">
              <Button id="text" variant="contained">
                <Link to="/pages/numberPage">Search By Pokemon ID #</Link>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} align="center">
              <Button id="text" variant="contained">
                <Link to="/pages/namePage">Search By Pokemon Name</Link>
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} align="center">
              <Button id="text" variant="contained">
                <Link to="/pages/typePage">Search By Pokemon Type</Link>
              </Button>
            </Grid>
          </Grid>
        </nav>
        <Switch>
          <Route path="/" exact component={Button}>
            <App />
          </Route>
          <Route path="/pages/numberPage" component={Button}>
            <NumberPage />
          </Route>
          <Route path="/pages/namePage" component={Button}>
            <PokemonPage />
          </Route>
          <Route path="/pages/typePage" component={Button}>
            <TypePage />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
