import { Box, Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../../components/TextField";
import api from "../../services/api";

const initialValue = { nomeCurso: "" };

const CursoForm = () => {
  const { id } = useParams<{ id: any }>();
  const history = useHistory();
  const [values, setValues] = useState(initialValue);

  useEffect(() => {
    if (id !== "new") {
      api.getCurso(id).then((res: any) => {
        setValues(res.data.dados);
      });
    }
  }, []);

  const handleSubmit = (formValues: any) => {
    if (id == "new")
      return api
        .createCurso(formValues)
        .then(() => {
          alert("Cadastrado com sucesso!");
          history.push("/cursos");
        })
        .catch((err: any) => alert(`Erro: ${err.message}`));
    else
      return api
        .updateCurso(formValues, id)
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
                <TextField name="nomeCurso" label="Nome" />
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="flex-end" spacing={2}>
                  <Grid item xs="auto">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => history.push("/cursos")}
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

export default CursoForm;
