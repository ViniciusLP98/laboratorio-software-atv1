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
import DependenteForm from "./DependenteForm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DependenteList() {
  const classes = Styles();
  const history = useHistory();
  const [filterByName, setFilterByName] = useState<string | undefined>();
  const [dependentes, setDependentes] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api.getDependentes().then((res: any) => {
      console.log(res.data);
      setDependentes(res.data.dados);
    });
  }, []);

  const filteredItems = useMemo(() => {
    if (!filterByName || !dependentes) {
      return dependentes;
    }

    return dependentes.filter((dependente: any) =>
      dependente.nomeDependente.includes(filterByName)
    );
  }, [filterByName, dependentes]);

  return (
    <Container>
      <Box p={2}>
        <Box pb={3}>
          <Typography align="left" variant="h5">
            Dependentes
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
                          <b>Funcionário Atrelado</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredItems.map((dependente: any) => (
                        <TableRow
                          hover
                          key={dependente.id}
                          className={classes.clickableTableRow}
                          
                        >
                          <TableCell align="center" onClick={handleClickOpen} className={classes.tableCellSpecial}>{dependente.id}</TableCell>
                          <TableCell align="center">
                            {dependente.nomeDependente}
                          </TableCell>
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
                                          `/dependentes/${dependente.id}`
                                        )
                                      }
                                    >
                                      Editar Dependente
                                    </Button>
                                  </Grid>
                                </Grid>
                              </DialogContent>
                            </Box>
                          </Dialog>
                          <TableCell align="center">
                            {dependente.nomeFuncionario}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <AddRecord path="dependentes" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default DependenteList;
