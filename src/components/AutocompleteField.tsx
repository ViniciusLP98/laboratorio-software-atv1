import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { Field } from 'react-final-form';

function AutoCompleteCore(props: any) {
  const { input, options } = props;
  function getOption(value: string) {
    return options.find((option: any) => option === value) || null;
  }

  return (
    <Autocomplete
      options={options}
      value={getOption(input.value)}
      clearText="Limpar"
      openText="Abrir"
      closeText="Fechar"
      getOptionLabel={(option: any) => option}
      onChange={(event: any, newValue: any) => input.onChange(newValue || null)}
      renderInput={(params) => <TextField {...params} name={props.name} label={props.label} />}
    />
  );
}

function AutoCompleteField(props: any) {
  const { name, label, options } = props;

  return <Field name={name} label={label} options={options} component={AutoCompleteCore} />;
}

export default AutoCompleteField;
