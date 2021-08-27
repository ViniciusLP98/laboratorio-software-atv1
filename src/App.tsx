import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from "react";
import "./App.css";
import FuncionarioForm from "./containers/Funcionario/FuncionarioForm";
import DependenteForm from "./containers/Dependente/DependenteForm";
import CursoForm from "./containers/Curso/CursoForm";

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
            <Route exact path="/funcionarios">
              <FuncionarioForm />
            </Route>
            <Route path="/funcionarios/:id"> </Route>

            <Route exact path="/dependentes">
            <DependenteForm />
            </Route>
            <Route path="/dependentes/:id"></Route>

            <Route exact path="/cursos">
            <CursoForm />
            </Route>
            <Route path="/cursos/:id"> </Route>

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
