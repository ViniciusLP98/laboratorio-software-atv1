import { Box, Button, Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-final-form";
import { useHistory, useParams } from "react-router-dom";
import CursoField from "../../components/CursoField";
import YearPickerField from "../../components/YearPickerField";
import FuncionarioField from "../../components/FuncionarioField";
import api from "../../services/api";

const initialValue = { funcionario: [], curso: [], anoFormacao: "" };

const InscricaoForm = () => {
  const { id } = useParams<{ id: any }>();
  const history = useHistory();
  const [values, setValues] = useState(initialValue);

  useEffect(() => {
    if (id != "new") {
      api.getInscricao(id).then((res: any) => {
        setValues(res);
      });
    }
  }, []);

  const handleSubmit = (formValues: any) => {
    const submitValues = {
      idFuncionario: formValues.funcionario.id,
      idCurso: formValues.curso.id,
      anoFormacao: formValues.anoFormacao,
    };

    if (id == "new")
      return api
        .createInscricao(submitValues)
        .then(() => {
          alert("Cadastrado com sucesso!");
          history.push("/inscricoes");
        })
        .catch((err: any) => alert(`Erro: ${err.message}`));
    else
      return api
        .updateInscricao(submitValues, id)
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
                <FuncionarioField name="funcionario" label="Funcionário" />
              </Grid>
              <Grid item xs={12}>
                <CursoField name="curso" label="Curso" />
              </Grid>
              <Grid item xs={12}>
                <YearPickerField name="anoFormacao" label="Ano de Formação" />
              </Grid>
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
  );
};

export default InscricaoForm;
