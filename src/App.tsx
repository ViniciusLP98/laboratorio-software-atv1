import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import FuncionarioForm from "./containers/Funcionario/FuncionarioForm";
import DependenteForm from "./containers/Dependente/DependenteForm";
import CursoForm from "./containers/Curso/CursoForm";
import FuncionarioList from "./containers/Funcionario/FuncionarioList";
import DependenteList from "./containers/Dependente/DependenteList";
import CursoList from "./containers/Curso/CursoList";
import NavigationBar from "./components/NavigationBar";

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
          <NavigationBar>
            <Switch>
              <Route exact path="/funcionarios">
                <FuncionarioList />
              </Route>
              <Route path="/funcionarios/:id">
                <FuncionarioForm />
              </Route>
              <Route exact path="/dependentes">
                <DependenteList />
              </Route>
              <Route path="/dependentes/:id">
                <DependenteForm />
              </Route>
              <Route exact path="/cursos">
                <CursoList />
              </Route>
              <Route path="/cursos/:id">
                <CursoForm />
              </Route>
              <Route exact path="/home">
                Home!
              </Route>
            </Switch>
          </NavigationBar>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
