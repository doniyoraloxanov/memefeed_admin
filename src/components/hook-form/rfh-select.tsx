import { Controller, useFormContext } from 'react-hook-form';

import { Select, MenuItem } from '@mui/material';
import { SelectProps } from '@mui/material/Select';

// ----------------------------------------------------------------------

type Props = SelectProps & {
  name: string;
};

export default function RFHSelect({ name, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Select
            {...field}
            fullWidth
            value={field.value}
            onChange={(event) => {
              field.onChange(event.target.value);
            }}
            error={!!error}
            {...other}
          >
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="coin">Coin</MenuItem>
            <MenuItem value="usdt">USDT</MenuItem>
            <MenuItem value="telegram">Telegram</MenuItem>
          </Select>
        </div>
      )}
    />
  );
}
