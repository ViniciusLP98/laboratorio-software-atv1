import { Field } from 'react-final-form';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import ptBR from 'dayjs/locale/pt-br';

function YearPickerCore(props: any) {
  const { label, input, readOnly, disableUnderline, ...restProps } = props;

  return (
    <MuiPickersUtilsProvider locale={ptBR} utils={DayjsUtils}>
      <DatePicker
        {...props}
        {...restProps}
        views={['year']}
        readOnly={readOnly}
        InputProps={{ disableUnderline }}
        format="YYYY"
        label={label}
        value={input.value}
        onChange={(event) => {
          input.onChange(event?.format('YYYY-MM-DD'))
        }
        }
      />
    </MuiPickersUtilsProvider>
  );
}

function YearPickerField(props: any) {
  const { name, label, readOnly, disableUnderline, dateDisabled } = props;

  return (
    <Field
      name={name}
      label={label}
      readOnly={readOnly}
      disabled={dateDisabled}
      disableUnderline={disableUnderline}
      component={YearPickerCore}
    />
  );
}

export default YearPickerField;
