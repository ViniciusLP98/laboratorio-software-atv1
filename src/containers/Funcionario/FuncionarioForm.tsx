import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useParams } from "react-router-dom";
import DatePickerField from "../../components/DatePickerField";
import NumericField from "../../components/NumericField";
import TextField from "../../components/TextField";


const initialValue = { nome: "", matricula: "", dataNascimento: "" }

const FuncionarioForm = () => {
  const id = useParams();
    const [values, setValues] = useState(initialValue);
    
    // useEffect(() => {
    //     if (id != "new") {
    //         api.getFuncionario(id)
    //             .then((res: any) => {
    //                 setValues(res)
    //             })
    //     }
    // }, [])

    const handleSubmit = (formValues: any) => {

      // if (id == "new") return api.createFuncionario(formValues)
      //     .then(() => alert("Cadastrado com sucesso!"))
      //     .catch((err: any) => alert(`Erro: ${err.message}`))

      // else return api.updateFuncionario(formValues, id)
      //     .then(() => alert("Salvo com sucesso!"))
      //     .catch((err: any) => alert(`Erro: ${err.message}`))
  }
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={values}
      render={({ handleSubmit }) => (
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="nome" label="Nome" />
            </Grid>
            <Grid item xs={12}>
              <NumericField name="matricula" label="Matrícula" /> 
            </Grid>
            <Grid item xs={12}>
              <DatePickerField name="dataNascimento" label="Data de Nascimento" />
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

export default FuncionarioForm;
