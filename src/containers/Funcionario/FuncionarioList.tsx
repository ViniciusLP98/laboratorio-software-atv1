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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import dayjs from "dayjs";
import Styles from "../../styles/Styles";
import { AddRecord } from "../../components/AddRecord";
import FuncionarioForm from "./FuncionarioForm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FuncionarioList() {
  const classes = Styles();
  const history = useHistory();
  const [filterByName, setFilterByName] = useState<string | undefined>();
  const [funcionarios, setFuncionarios] = useState([]);
  const [cursosFuncionarios, setCursosFuncionarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [anotherOpen, setAnotherOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAnotherOpen = () => {
    setAnotherOpen(true);
  };

  const handleAnotherClose = () => {
    setAnotherOpen(false);
  };

  useEffect(() => {
    api.getFuncionarios().then((res: any) => {
      console.log(res.data);
      setFuncionarios(res.data.dados);
    });
  }, []);

  const filteredItems = useMemo(() => {
    if (!filterByName || !funcionarios) {
      return funcionarios;
    }

    return funcionarios.filter((funcionario: any) =>
      funcionario.nomeFuncionario.includes(filterByName)
    );
  }, [filterByName, funcionarios]);

  return (
    <Container>
      <Box p={2}>
        <Box pb={3}>
          <Typography align="left" variant="h5">
            Funcionários
          </Typography>
        </Box>
        <Paper elevation={0}>
          <Box p={2}>
            <Grid
              container
              justify="flex-start"
              alignItems="flex-end"
              spacing={3}
            >
              <Grid item xs="auto">
                <Typography align="left">Nome: </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Nome"
                  onChange={(event) => setFilterByName(event.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={0} style={{ backgroundColor: "#478bc9"}}>
              <Box p={2}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <b>ID</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Nome</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Matrícula</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Data de Nascimento</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredItems.map((funcionario: any) => (
                        <TableRow
                          hover
                          key={funcionario.id}
                          className={classes.clickableTableRow}
                        >
                          <TableCell
                            align="center"
                            onClick={handleClickOpen}
                            className={classes.tableCellSpecial}
                          >
                            {funcionario.id}
                          </TableCell>
                          <TableCell align="center" onClick={handleClickAnotherOpen}>
                            {funcionario.nomeFuncionario}
                          </TableCell>
                          <Dialog open={anotherOpen} onClose={handleAnotherClose}>
                            <Box p={2}>
                              <DialogTitle>Opções</DialogTitle>
                              <DialogContent>                                
                                <Grid
                                  container
                                  justify="space-between"
                                  spacing={2}
                                >
                                  <Grid item xs="auto">
                                    <Button
                                      variant="outlined"
                                      onClick={() =>
                                        history.push(
                                          `/funcionarios/dependentes/${funcionario.id}`
                                        )
                                      }
                                    >
                                      Dependentes
                                    </Button>
                                  </Grid>
                                  <Grid item xs="auto">
                                    <Button
                                      variant="outlined"
                                      onClick={() =>
                                        history.push(
                                          `/funcionarios/cursos/${funcionario.id}`
                                        )
                                      }
                                    >
                                      Cursos
                                    </Button>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Button
                                      variant="outlined"
                                      onClick={handleAnotherClose}
                                    >
                                      Cancelar
                                    </Button>
                                  </Grid>
                                </Grid>
                              </DialogContent>
                            </Box>
                          </Dialog>
                          <Dialog open={open} onClose={handleClose}>
                            <Box p={2}>
                              <DialogTitle>Opções</DialogTitle>
                              <DialogContent>                                
                                <Grid
                                  container
                                  justify="space-between"
                                  spacing={2}
                                >
                                  <Grid item xs="auto">
                                    <Button
                                      variant="outlined"
                                      onClick={handleClose}
                                    >
                                      Cancelar
                                    </Button>
                                  </Grid>
                                  <Grid item xs="auto">
                                    <Button
                                      variant="outlined"
                                      onClick={() =>
                                        history.push(
                                          `/funcionarios/${funcionario.id}`
                                        )
                                      }
                                    >
                                      Editar Funcionário
                                    </Button>
                                  </Grid>
                                </Grid>
                              </DialogContent>
                            </Box>
                          </Dialog>
                          <TableCell align="center">
                            {funcionario.matriculaFuncionario}
                          </TableCell>
                          <TableCell align="center">
                            {dayjs(funcionario.dataNascimento).format(
                              "DD/MM/YYYY"
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <AddRecord path="funcionarios" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default FuncionarioList;
