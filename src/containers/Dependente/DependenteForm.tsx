import { Box, Button, Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-final-form";
import { useHistory, useParams } from "react-router-dom";
import FuncionarioField from "../../components/FuncionarioField";
import TextField from "../../components/TextField";
import api from "../../services/api";

const initialValue = { nomeDependente: "" };

const DependenteForm = () => {
  const { id } = useParams<{ id: any }>();
  const history = useHistory();
  const [values, setValues] = useState(initialValue);

  useEffect(() => {
    if (id != "new") {
      api.getDependente(id).then((res: any) => {
        setValues(res.data.dados);
      });
    }
  }, []);

  const handleSubmit = (formValues: any) => {
    const submitValues = {
      nomeDependente: formValues.nomeDependente,
      idFuncionario: formValues.funcionario.id,
    };

    if (id == "new")
      return api
        .createDependente(submitValues)
        .then(() => {
          alert("Cadastrado com sucesso!");
          history.push("/dependentes");
        })
        .catch((err: any) => alert(`Erro: ${err.message}`));
    else
      return api
        .updateDependente(submitValues, id)
        .then(() => {
          alert("Salvo com sucesso!");
          history.push("/dependentes");
        })
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
                <TextField name="nomeDependente" label="Nome" />
              </Grid>
              <Grid item xs={12}>
                {id !== "new" ? (
                  <TextField
                    disabled
                    name="funcionario"
                    label="Funcionário"
                  />
                ) : (
                  <FuncionarioField name="funcionario" label="Funcionário" />
                )}
              </Grid>
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
  );
};

export default DependenteForm;
