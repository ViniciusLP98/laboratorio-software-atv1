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
import DatePickerField from "../../components/DatePickerField";
import NumericField from "../../components/NumericField";
import TextField from "../../components/TextField";
import api from "../../services/api";

const initialValue = {
  nomeFuncionario: "",
  matriculaFuncionario: "",
  dataNascimento: dayjs().format('MM/DD/YYYY')
};

const FuncionarioForm = () => { 
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
      api.getFuncionario(id).then((res: any) => {
        setValues(res.data.dados);
      });
    }
  }, []);

  const handleSubmit = (formValues: any) => {
    const submitValues = {
      nomeFuncionario: formValues.nomeFuncionario,
      matriculaFuncionario: formValues.matriculaFuncionario,
      dataNascimento: dayjs(formValues.dataNascimento).format("YYYY-MM-DD"),
    };

    if (id == "new")
      return api
        .createFuncionario(submitValues)
        .then((res: any) => {
          if(res.ok){
            alert("Cadastrado com sucesso!");
            history.push("/funcionarios");
          }
          else{
            alert("Houve um problema com o cadastro! Tente novamente.");
          }
          
        })
    else
      return api
        .updateFuncionario(submitValues, id)
        .then((res: any) => {
          if(res.ok){
            alert("Salvo com sucesso!");
            history.push("/funcionarios");
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
            Formulário de Funcionário
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
                <TextField name="nomeFuncionario" label="Nome" />
              </Grid>
              <Grid item xs={2}>
                <Typography>Matrícula:</Typography>
              </Grid>
              <Grid item xs={10}>
                <NumericField name="matriculaFuncionario" label="Matrícula" />
              </Grid>
              <Grid item xs={2}>
                <Typography>Data de Nascimento:</Typography>
              </Grid>
              <Grid item xs="auto">
                <DatePickerField
                  name="dataNascimento"
                  label="Data de Nascimento"
                />
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
                        Excluir Funcionário
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <Box p={2}>
                          <DialogTitle>{"Excluir Funcionário"}</DialogTitle>
                          <DialogContent>
                            <Grid container justify="center" spacing={2}>
                              <Grid item xs={12}>
                                <Typography>
                                  Tem certeza que deseja excluir este
                                  funcionário?
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
                                        api.deleteFuncionario(id)
                                        .then(() => {
                                          alert("Funcionário excluído com sucesso!")
                                          history.push('/funcionarios')
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
                      onClick={() => history.push("/funcionarios")}
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

export default FuncionarioForm;
