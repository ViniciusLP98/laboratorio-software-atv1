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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function InscriçãoList() {
  const history = useHistory();
  const [inscricoes, setInscricoes] = useState([]);

  useEffect(() => {
    api.getInscricoes().then((res: any) => setInscricoes(res.data.dados));
  }, [inscricoes]);

  return (
    <>
      <Grid container spacing={3}>
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
                        <b>ID Funcionário</b>
                      </TableCell>
                      <TableCell>
                        <b>ID Curso</b>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inscricoes.map((inscricao: any) => (
                      <TableRow key={inscricao.id}>
                        <TableCell>{inscricao.id}</TableCell>
                        <TableCell>{inscricao.idFuncionario}</TableCell>
                        <TableCell>{inscricao.idCurso}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <Button
                            onClick={() => api.deleteFuncionario(inscricao.id)}
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
            onClick={() => history.push("/inscricoes/new")}
          >
            Adicionar Inscrição
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default InscriçãoList;
