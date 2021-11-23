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
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import Styles from "../../styles/Styles";
import { AddRecord } from "../../components/AddRecord";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CursoList() {
  const classes = Styles();
  const history = useHistory();
  const [filterByName, setFilterByName] = useState<string | undefined>();
  const [cursos, setCursos] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api.getCursos().then((res: any) => {
      console.log(res.data);
      setCursos(res.data.dados);
    });
  }, []);

  const filteredItems = useMemo(() => {
    if (!filterByName || !cursos) {
      return cursos;
    }

    return cursos.filter((dependente: any) =>
      dependente.nomeCurso.includes(filterByName)
    );
  }, [filterByName, cursos]);

  return (
    <Container>
      <Box p={2}>
        <Box pb={3}>
          <Typography align="left" variant="h5">
            Cursos
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
                <Typography align="left">Curso: </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Curso"
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
                          <b>Curso</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredItems.map((curso: any) => (
                        <TableRow
                          hover
                          key={curso.id}
                          className={classes.clickableTableRow}
                        >
                          <TableCell align="center" onClick={handleClickOpen} className={classes.tableCellSpecial}>
                            {curso.id}
                          </TableCell>
                          <TableCell align="center">
                            {curso.nomeCurso}
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
                                        history.push(`/cursos/${curso.id}`)
                                      }
                                    >
                                      Editar Curso
                                    </Button>
                                  </Grid>
                                </Grid>
                              </DialogContent>
                            </Box>
                          </Dialog>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <AddRecord path="cursos" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CursoList;
