import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { Field } from 'react-final-form';
import api from '../services/api';

function AutocompleteCore(props: any) {
  const { input } = props;
  const [optionsFuncionario, setOptionsFuncionario] = useState([]);
  
  useEffect(() => {
    api.getFuncionarios().then((res: any) => {
      setOptionsFuncionario(res.data.dados)
    });
  }, []);

  function getOption(value: any) {
    return optionsFuncionario.find((option: any) => option === value) || null;
  }

  console.log(optionsFuncionario)

  return (
    <Autocomplete
      options={optionsFuncionario}
      value={getOption(input.value)}
      clearText="Limpar"
      openText="Abrir"
      closeText="Fechar"
      getOptionLabel={(option: any) => option.nomeFuncionario}
      onChange={(event: any, newValue: any) => input.onChange(newValue || null)}
      renderInput={(params) => <TextField {...params} name={props.name} label={props.label} />}
    />
  );
}

function FuncionarioField(props: any) {
  const { name, label } = props;

  return <Field name={name} label={label} component={AutocompleteCore} />;
}

export default FuncionarioField;