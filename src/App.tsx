import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from "react";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#478BC9",
    },
    secondary: {
      main: "#80F1D3",
    },
  },
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/funcionario">
              {" "}
            </Route>
            <Route path="/funcionario/:id"> </Route>

            <Route exact path="/dependente">
              {" "}
            </Route>
            <Route path="/dependente/:id"></Route>

            <Route exact path="/curso">
              {" "}
            </Route>
            <Route path="/curso/:id"> </Route>

            <Route exact path="/home">
              Home!
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
