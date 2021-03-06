import { Field } from "react-final-form";
import { TextField as TextInput, Typography } from "@material-ui/core";

function TextFieldCore(props: any) {
  const input = props.input;
  const label = props.label;
  const meta = props.meta;
  const disabled = props.disabled;

  let error = "";

  if (meta.touched) {
    error = meta.error;
  }

  return (
    <>
      <TextInput
        {...input}
        fullWidth
        label={label}
        value={input.value}
        disabled={disabled}
        onChange={(event) => input.onChange(event.target.value)}
      />
      <Typography color="error" variant="subtitle2">
        {error}
      </Typography>
    </>
  );
}

function TextField(props: any) {
  return (
    <Field name={props.name} label={props.label} disabled={props.disabled} component={TextFieldCore} />
  );
}

export default TextField;
