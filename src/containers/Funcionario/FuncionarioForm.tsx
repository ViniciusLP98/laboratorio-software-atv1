import { Box, Button, Grid } from "@material-ui/core";
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
  matriculaFuncionario: ""
};

const FuncionarioForm = () => {
  const { id } = useParams<{ id: any }>();
  const history = useHistory();
  const [values, setValues] = useState(initialValue);

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
      dataNascimento: dayjs(formValues.dataNascimento).format('YYYY-MM-DD')
    };
    if (id == "new")
      return api
        .createFuncionario(submitValues)
        .then(() => {
          alert("Cadastrado com sucesso!");
          history.push("/funcionarios");
        })
        .catch((err: any) => alert(`Erro: ${err.message}`));
    else
      return api
        .updateFuncionario(submitValues, id)
        .then(() => alert("Salvo com sucesso!"))
        .catch((err: any) => alert(`Erro: ${err.message}`));
  };
  return (
    <Box p={2}>
      <Form
        onSubmit={handleSubmit}
        initialValues={values}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField name="nomeFuncionario" label="Nome" />
              </Grid>
              <Grid item xs={12}>
                <NumericField name="matriculaFuncionario" label="Matrícula" />
              </Grid>
              <Grid item xs={12}>
                <DatePickerField
                  name="dataNascimento"
                  label="Data de Nascimento"
                />
              </Grid>
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
  );
};

export default FuncionarioForm;
