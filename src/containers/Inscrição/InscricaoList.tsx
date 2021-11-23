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
  DialogContent
} from "@material-ui/core";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import Styles from "../../styles/Styles";
import { AddRecord } from "../../components/AddRecord";
import dayjs from "dayjs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function InscricaoList() {
  const classes = Styles();
  const history = useHistory();
  const [filterByName, setFilterByName] = useState<string | undefined>();
  const [inscricoes, setInscricoes] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api.getInscricoes().then((res: any) => {
      console.log(res.data);
      setInscricoes(res.data.dados);
    });
  }, []);

  return (
    <Container>
      <Box p={2}>
        <Box pb={3}>
          <Typography align="left" variant="h5">
            Inscrições
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={0} style={{ backgroundColor: "#478bc9" }}>
              <Box p={2}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <b>ID</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Curso</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Funcionário</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Ano de Formação</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {inscricoes.map((inscricao: any) => (
                        <TableRow
                          hover
                          key={inscricao.id}
                          className={classes.clickableTableRow}
                        >
                          <TableCell align="center" onClick={handleClickOpen} className={classes.tableCellSpecial}>{inscricao.id}</TableCell>
                          <Dialog open={open} onClose={handleClose}>
                            <Box p={2}>
                              <DialogTitle>Opções</DialogTitle>
                              <DialogContent>
                                <Grid container justify="center" spacing={2}>
                                  <Grid item xs={12}>
                                    <Grid
                                      container
                                      justify="flex-end"
                                      spacing={2}
                                    >
                                      <Grid item xs="auto">
                                        <Button
                                          variant="outlined"
                                          color="primary"
                                          onClick={handleClose}
                                        >
                                          Cancelar
                                        </Button>
                                      </Grid>
                                      <Grid item xs="auto">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={() => {
                                            api.deleteInscricao(inscricao.id).then(() => {
                                              alert(
                                                "Eu não me responsabilizo pelos danos causados ao apertar este botão."
                                              );
                                              history.push("/inscricoes");
                                            });
                                          }}
                                        >
                                          Excluir Inscrição
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </DialogContent>
                            </Box>
                          </Dialog>
                          <TableCell align="center">
                            {inscricao.nomeFuncionario}
                          </TableCell>
                          <TableCell align="center">
                            {inscricao.nomeCurso}
                          </TableCell>
                          <TableCell align="center">
                            {dayjs(inscricao.anoFormacao).format("YYYY")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <AddRecord path="inscricoes" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default InscricaoList;
