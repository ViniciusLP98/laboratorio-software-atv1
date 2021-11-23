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
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useHistory, useParams } from "react-router-dom";
import FuncionarioField from "../../components/FuncionarioField";
import CursoField from "../../components/CursoField";
import YearPickerField from "../../components/YearPickerField";
import api from "../../services/api";
import dayjs from "dayjs";

const initialValue = {
  anoFormacao: dayjs().format('YYYY')
};

const InscricaoForm = () => { 
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
      api.getInscricao(id).then((res: any) => {
        setValues(res.data.dados);
      });
    }
  }, []);

  const handleSubmit = (formValues: any) => {
    const submitValues = {
      idFuncionario: formValues.funcionario.id,
      idCurso: formValues.curso.id,
      anoFormacao: formValues.anoFormacao,
    };

    return api
        .createInscricao(submitValues)
        .then((res: any) => {
          if(res.ok){
            alert("Cadastrado com sucesso!");
            history.push("/inscricoes");
          }
          else{
            alert("Houve um problema com o cadastro! Tente novamente.");
          }
          
        })
  };
  return (
    <Container>
    <Box p={2}>
      <Box pb={3}>
          <Typography align="left" variant="h5">
            Formulário de Inscrição
          </Typography>
        </Box>
      <Form
        onSubmit={handleSubmit}
        initialValues={values}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container alignItems="flex-end" spacing={2}>
              <Grid item xs={2}>
                <Typography>Funcionário:</Typography>
              </Grid>
              <Grid item xs={10}>
                <FuncionarioField name="funcionario" label="Funcionário" />
              </Grid>
              <Grid item xs={2}>
                <Typography>Curso:</Typography>
              </Grid>
              <Grid item xs={10}>
                <CursoField name="curso" label="Curso" />
              </Grid>
              <Grid item xs={2}>
                <Typography>Ano de Formação:</Typography>
              </Grid>
              <Grid item xs="auto">
                <YearPickerField
                  name="anoFormacao"
                  label="Ano de Formação"
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
                        Excluir Inscrição
                      </Button>
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
                      onClick={() => history.push("/inscricoes")}
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

export default InscricaoForm;
