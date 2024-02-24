import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { TextField, TextFieldProps, InputAdornment } from '@mui/material';

type Props<T extends FieldValues = FieldValues> = UseControllerProps<T> & {
  name: UseControllerProps<T>['name'];
  control: UseControllerProps<T>['control'];
  label?: TextFieldProps['label'];
  required?: boolean;
  fullWidth?: boolean;
  rules?: UseControllerProps<T>['rules'];
  variant?: TextFieldProps['variant'];
  sx?: TextFieldProps['sx'];
  endAdornment?: React.ReactNode;
  type?: TextFieldProps['type'];
};

const ControlledTextField = <T extends FieldValues = FieldValues>({
  sx,
  name,
  control,
  label,
  required,
  fullWidth,
  rules,
  defaultValue,
  variant,
  endAdornment,
  type,
}: Props<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control, rules });

  return (
    <TextField
      sx={sx}
      {...field}
      label={label}
      error={invalid}
      variant={variant}
      required={required}
      fullWidth={fullWidth}
      helperText={error?.message}
      defaultValue={defaultValue}
      type={type}
      InputProps={{
        endAdornment: endAdornment && (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
    />
  );
};

export default ControlledTextField;
