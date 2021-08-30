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
function DependenteList() {
  const history = useHistory();
  const [filterByName, setFilterByName] = useState<string | undefined>();
  const [dependentes, setDependentes] = useState([]);

  useEffect(() => {
      api.getDependentes()
          .then((res: any) => setDependentes(res.data.dados))
  }, [dependentes]);

  const filteredItems = useMemo(() => {
    if (!filterByName || !dependentes) {
      return dependentes;
    }

    return dependentes.filter((dependente: any) => dependente.nomeDependente.includes(filterByName));
  }, [filterByName, dependentes]);

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
                        <b>Nome</b>
                      </TableCell>
                      <TableCell>
                        <b>ID Funcionário</b>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredItems.map((dependente: any) => (
                      <TableRow key={dependente.id}>
                        <TableCell>{dependente.id}</TableCell>
                        <TableCell>{dependente.nomeDependente}</TableCell>
                        <TableCell>{dependente.idFuncionario}</TableCell>
                        <TableCell>
                          <Button>
                            <Link
                              to={`/dependentes/${dependente.id}`}
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
                            onClick={() => api.deleteDependente(dependente.id)}
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
            onClick={() => history.push("/dependentes/new")}
          >
            Adicionar Dependente
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default DependenteList;
