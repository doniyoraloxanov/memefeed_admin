'use client';

import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack, InputLabel, FormControl, OutlinedInput, InputAdornment } from '@mui/material';

type Users = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  status: string;
};

const AsynchronousTextField = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Users[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const users = await response.json();
        console.log(users);

        if (active) {
          setOptions(users);
        }
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Stack spacing={2}>
      <Autocomplete
        id="asynchronous-demo"
        open={open}
        fullWidth
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.firstName === value.firstName}
        getOptionLabel={(option) => option.firstName}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a user"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
      </FormControl>
    </Stack>
  );
};

export default AsynchronousTextField;
