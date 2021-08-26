import React from 'react';
import { Field } from 'react-final-form';
import { TextField as TextInput, Typography } from '@material-ui/core';

function NumericFieldCore(props: any) {
  const { input, label, meta, required } = props;
  // const min = props.min;

  let error = '';

  if (meta.touched) {
    error = meta.error;
  }

  return (
    <>
      <TextInput
        {...input}
        {...props}
        fullWidth
        required={required}
        label={label}
        type="number"
        value={input.value}
        onChange={(event) => input.onChange(event.target.value)}
      />
      <Typography color="error" variant="subtitle2">
        {error}
      </Typography>
    </>
  );
}

function NumericField(props: any) {
  const { name, label, required } = props;

  return (
    <Field name={name} label={label} required={required} component={NumericFieldCore} {...props} />
  );
}

export default NumericField;
