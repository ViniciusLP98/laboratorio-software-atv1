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
  TextField
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CursoList() {
  const history = useHistory();
  const [filterByName, setFilterByName] = useState<string | undefined>();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    api.getCursos().then((res: any) => setCursos(res.data));
  }, [cursos]);

  const filteredItems = useMemo(() => {
    if (!filterByName || !cursos) {
      return cursos;
    }

    return cursos.filter((curso: any) =>
      curso.nomeCurso.includes(filterByName)
    );
  }, [filterByName, cursos]);

  return (
    <>
      <Grid container spacing={3}>
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
                        <b>Curso</b>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredItems.map((curso: any) => (
                      <TableRow key={curso.id}>
                        <TableCell>{curso.id}</TableCell>
                        <TableCell>{curso.nomeCurso}</TableCell>
                        <TableCell>
                          <Button>
                            <Link
                              to={`/cursos/${curso.id}`}
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
                          <Button onClick={() => api.deleteCurso(curso.id)}>
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
            onClick={() => history.push("/cursos/new")}
          >
            Adicionar Curso
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CursoList;
