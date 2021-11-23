import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Paper,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  TextField,
  Container,
} from "@material-ui/core";
import api from "../services/api";
import { Link, useHistory, useParams } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DependentesFuncionarioList() {
  const history = useHistory();
  const { id } = useParams<{ id: any }>();
  const [dependentesFuncionario, setDependentesFuncionario] = useState([]);
  const [funcionario, setFuncionario] = useState({
    id: null,
    matriculaFuncionario: null,
    nomeFuncionario: "",
    dataNascimento: "",
  });

  useEffect(() => {
    api.getDependentesFuncionario(id).then((res: any) => {
      setDependentesFuncionario(res.data.dados);
    });
  }, []);

  useEffect(() => {
    api.getFuncionario(id).then((res: any) => {
      setFuncionario(res.data.dados);
    });
  }, []);

  return (
    <Container>
      <Box p={2}>
        <Box pb={3}>
          <Typography align="left" variant="h5">
            Dependentes de {funcionario.nomeFuncionario}
          </Typography>
        </Box>
        <Paper elevation={0}>
          <Box p={2}>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item>
                    <Paper elevation={0} style={{ backgroundColor: "#478bc9"}}>
                      <Box p={2}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">
                                <b>ID</b>
                              </TableCell>
                              <TableCell align="center">
                                <b>Nome</b>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {dependentesFuncionario.map((dependente: any) => (
                              <TableRow key={dependente.id}>
                                <TableCell align="center">
                                  {dependente.id}
                                </TableCell>
                                <TableCell align="center">
                                  {dependente.nomeDependente}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/funcionarios")}
                >
                  Voltar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default DependentesFuncionarioList;
