import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { Field } from 'react-final-form';
import api from '../services/api';

function AutocompleteCore(props: any) {
  const { input } = props;
  const [optionsCurso, setOptionsCurso] = useState([]);
  
  useEffect(() => {
    api.getCursos().then((res: any) => {
      setOptionsCurso(res.data.dados)
    });
  }, []);

  function getOption(value: any) {
    return optionsCurso.find((option: any) => option === value) || null;
  }

  console.log(optionsCurso)

  return (
    <Autocomplete
      options={optionsCurso}
      value={getOption(input.value)}
      clearText="Limpar"
      openText="Abrir"
      closeText="Fechar"
      getOptionLabel={(option: any) => option.nomeCurso}
      onChange={(event: any, newValue: any) => input.onChange(newValue || null)}
      renderInput={(params) => <TextField {...params} name={props.name} label={props.label} />}
    />
  );
}

function CursoField(props: any) {
  const { name, label } = props;

  return <Field name={name} label={label} component={AutocompleteCore} />;
}

export default CursoField;