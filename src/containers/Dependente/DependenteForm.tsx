import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-final-form";
import { useParams } from "react-router-dom";
import AutocompleteField from "../../components/AutocompleteField";
import DatePickerField from "../../components/DatePickerField";
import NumericField from "../../components/NumericField";
import TextField from "../../components/TextField";
import api from "../../services/api";

const initialValue = { nomeDependente: "", idFuncionario: {} };

const DependenteForm = () => {
  const id = useParams();
  const [optionsFuncionario, setOptionsFuncionario] = useState([]);
  const [values, setValues] = useState(initialValue);

  const options = [
    {
      nome: 'teste 1',
      id: 1
    },
    {
      nome: 'teste 2',
      id: 2
    },
    {
      nome: 'teste 3',
      id: 3
    }
  ]

  // useEffect(() => {
  //   api.getFuncionarios().then((res: any) => {
  //     setOptionsFuncionario(res.dados);
  //   });
  // }, []);

  // useEffect(() => {
  //     if (id != "new") {
  //         api.getDependente(id)
  //             .then((res: any) => {
  //                 setValues(res)
  //             })
  //     }
  // }, [])

  const handleSubmit = (formValues: any) => {
    const submitValues = {
      nomeDependente: formValues.nomeDependente,
      idFuncionario: formValues.funcionario.id,
    };

    return api
      .createDependente(submitValues)
      .then(() => alert("Cadastrado com sucesso!"))
      .catch((err: any) => alert(`Erro: ${err.message}`));

    // if (id == "new") return api.createDependente(formValues)
    //     .then(() => alert("Cadastrado com sucesso!"))
    //     .catch((err: any) => alert(`Erro: ${err.message}`))

    // else return api.updateDependente(formValues, id)
    //     .then(() => alert("Salvo com sucesso!"))
    //     .catch((err: any) => alert(`Erro: ${err.message}`))
  };
  return (
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
              <AutocompleteField
                name="funcionario"
                label="Funcionário"
                options={options}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="flex-end" spacing={2}>
                <Grid item xs="auto">
                  <Button variant="outlined" color="primary">
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
