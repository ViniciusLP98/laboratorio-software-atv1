import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-final-form";
import { useHistory, useParams } from "react-router-dom";
import AutocompleteField from "../../components/AutocompleteField";
import api from "../../services/api";

const initialValue = { funcionario: [], curso: [] };

const DependenteForm = () => {
  const { id } = useParams<{ id: any }>();
  const history = useHistory();
  const [values, setValues] = useState(initialValue);

  const loadFuncionarios = () => {
    api.getFuncionarios().
    then((res: any) => {
      return res.data
    } )
  }

  const loadCursos = () => {
    api.getCursos().
    then((res: any) => {
      return res.data
    } )
  }
  
  useEffect(() => {
      if (id != "new") {
          api.getDependente(id)
              .then((res: any) => {
                  setValues(res)
              })
      }
  }, [])

  const handleSubmit = (formValues: any) => {
    const submitValues = {
      idFuncionario: formValues.funcionario.id,
      idCurso: formValues.curso.id,
    };

    // if (id == "new")
    //   return api
    //     .createDependente(submitValues)
    //     .then(() => {
    //       alert("Cadastrado com sucesso!");
    //       history.push("/inscricao-curso");
    //     })
    //     .catch((err: any) => alert(`Erro: ${err.message}`));
    // else
    //   return api
    //     .updateDependente(submitValues, id)
    //     .then(() => alert("Salvo com sucesso!"))
    //     .catch((err: any) => alert(`Erro: ${err.message}`));
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={values}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <AutocompleteField
                name="funcionario"
                label="Funcionário"
                options={loadFuncionarios}
              />
            </Grid>
            <Grid item xs={12}>
              
              <AutocompleteField
                name="curso"
                label="Curso"
                options={loadCursos}
              />
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
  );
};

export default DependenteForm;
