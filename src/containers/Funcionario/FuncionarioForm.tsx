import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";
import { Form } from "react-final-form";

const FuncionarioForm = () => {
  return (
    <Form
      validate
      onSubmit
      initialValues
      render={({ handleSubmit }) => (
        <form onSubmit={}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField />
            </Grid>
            <Grid item xs={12}>
              <TextField />
            </Grid>
            <Grid item xs={12}>
              <TextField />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="flex-end" spacing={2}>
                <Grid item xs="auto">
                  <Button variant="outlined" color="primary" onClick={}>
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
