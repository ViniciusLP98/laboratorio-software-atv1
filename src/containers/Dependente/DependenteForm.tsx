import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useHistory, useParams } from "react-router-dom";
import FuncionarioField from "../../components/FuncionarioField";
import TextField from "../../components/TextField";
import api from "../../services/api";

const initialValue = {};

const DependenteForm = () => { 
  const { id } = useParams<{ id: any }>();
  const history = useHistory();
  const [values, setValues] = useState(initialValue);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (id != "new") {
      api.getDependente(id).then((res: any) => {
        setValues({
          nomeDependente: res.data.dados.nomeDependente,
          funcionario: res.data.dados.nomeFuncionario
        })
      });
    }
  }, []);

  const handleSubmit = (formValues: any) => {
    const submitValues = {
      nomeDependente: formValues.nomeDependente,
      idFuncionario: formValues.funcionario.id
    };

    if (id == "new")
      return api
        .createDependente(submitValues)
        .then((res: any) => {
          if(res.ok){
            alert("Cadastrado com sucesso!");
            history.push("/dependentes");
          }
          else{
            alert("Houve um problema com o cadastro! Tente novamente.");
          }
          
        })
    else
      return api
        .updateDependente(submitValues, id)
        .then((res: any) => {
          if(res.ok){
            alert("Salvo com sucesso!");
            history.push("/dependentes");
          }
          else{
            alert("Houve um problema com a alteração! Tente novamente.");
          }
          
        })
  };
  return (
    <Container>
    <Box p={2}>
      <Box pb={3}>
          <Typography align="left" variant="h5">
            Formulário de Dependente
          </Typography>
        </Box>
      <Form
        onSubmit={handleSubmit}
        initialValues={values}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container alignItems="flex-end" spacing={2}>
              <Grid item xs={2}>
                <Typography>Nome:</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField name="nomeDependente" label="Nome" />
              </Grid>
              <Grid item xs={2}>
                <Typography>Funcionário:</Typography>
              </Grid>
              <Grid item xs={10}>
                {id !== 'new' ? (
                  <TextField
                    disabled
                    name="funcionario"
                    label="Funcionário"
                  />
                ) : (
                  <FuncionarioField name="funcionario" label="Funcionário" />
                )}
              </Grid>

              {id !== "new" ? (
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Grid item xs>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClickOpen}
                      >
                        Excluir Dependente
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <Box p={2}>
                          <DialogTitle>{"Excluir Dependente"}</DialogTitle>
                          <DialogContent>
                            <Grid container justify="center" spacing={2}>
                              <Grid item xs={12}>
                                <Typography>
                                  Tem certeza que deseja excluir este
                                  dependente?
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid container justify="flex-end" spacing={2}>
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
                                        api.deleteDependente(id)
                                        .then(() => {
                                          alert("Dependente excluído com sucesso!")
                                          history.push('/dependentes')
                                        })
                                      }}
                                    >
                                      Salvar
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </DialogContent>
                        </Box>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Grid container justify="flex-end" spacing={2}>
                  <Grid item xs="auto">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => history.push("/dependentes")}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    <Button type="submit" variant="contained" color="primary">
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Box>
    </Container>
  );
};

export default DependenteForm;
