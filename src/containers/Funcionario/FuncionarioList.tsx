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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FuncionarioList() {
  const history = useHistory();
  const [filterByName, setFilterByName] = useState<string | undefined>();
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
      api.getFuncionarios()
          .then((res: any) => { console.log(res.data)
            setFuncionarios(res.data.dados)})
  }, []);

  const filteredItems = useMemo(() => {
    if (!filterByName || !funcionarios) {
      return funcionarios;
    }

    return funcionarios.filter((funcionario: any) => funcionario.nomeFuncionario.includes(filterByName));
  }, [filterByName, funcionarios]);

  return (
    <Box p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Funcionários</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="left">Pesquise por nome: </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            fullWidth
            name="name"
            label="Nome"
            onChange={(event) => setFilterByName(event.target.value)}
            />
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} style={{ maxHeight: "100%", overflow: "auto" }}>
            <Box p={1}>
              <TableContainer>
                <Table size="small" style={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Código</b>
                      </TableCell>
                      <TableCell>
                        <b>Nome</b>
                      </TableCell>
                      <TableCell>
                        <b>Matrícula</b>
                      </TableCell>
                      <TableCell>
                        <b>Data de Nascimento</b>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredItems.map((funcionario: any) => (
                      <TableRow key={funcionario.id}>
                         <TableCell>{funcionario.id}</TableCell>
                        <TableCell>{funcionario.nomeFuncionario}</TableCell>
                        <TableCell>
                          {funcionario.matriculaFuncionario}
                        </TableCell>
                        <TableCell>{funcionario.dataNascimento}</TableCell>
                        <TableCell>
                          <Button>
                            <Link
                              to={`/funcionarios/${funcionario.id}`}
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
                            >
                              <EditIcon />
                              Editar
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() =>
                              api.deleteFuncionario(funcionario.id)
                            }
                          >
                            <DeleteIcon />
                            Excluir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/funcionarios/new")}
          >
            Adicionar Funcionário
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FuncionarioList;
