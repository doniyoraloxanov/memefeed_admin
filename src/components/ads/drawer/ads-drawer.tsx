'use client';

import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material/styles';
import { Stack, Button, Typography } from '@mui/material';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { paper } from 'src/theme/css';

import { useSnackbar } from 'src/components/snackbar';
import { RHFTextField } from 'src/components/hook-form';
import RFHSelect from 'src/components/hook-form/rfh-select';
import RHFSwitch from 'src/components/hook-form/rhf-switch';
import FormProvider from 'src/components/hook-form/form-provider';

import { createAd } from './actions';

type AdsDrawerProps = {
  open: boolean;
  onClose: VoidFunction;
};

type Inputs = {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  status: boolean;
};

export default function AdsDrawer({ open, onClose }: AdsDrawerProps) {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<Inputs>();

  const onSubmit = methods.handleSubmit(async () => {
    const data = methods.getValues();
    await createAd(data);

    enqueueSnackbar('Advertisement added successfully', { variant: 'success' });

    methods.reset({
      title: '',
      description: '',
      url: '',
      imageUrl: '',
      status: true,
    });
    onClose();
  });

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { invisible: true },
      }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          ...paper({ theme, bgcolor: theme.palette.background.default }),
          width: 400,
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Title</Typography>
            <RHFTextField name="title" label="Enter title" required />
          </Stack>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Description</Typography>
            <RHFTextField
              name="description"
              label="Enter description"
              required
              multiline
              rows={4}
            />
          </Stack>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">URL</Typography>
            <RHFTextField name="url" label="Enter URL" />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Image URL</Typography>
            <RFHSelect name="imageUrl" label="Select Image" required />
          </Stack>
          <Stack spacing={1.5}>
            <RHFSwitch name="status" defaultChecked label="Select Status" required />
          </Stack>
          <Button variant="contained" fullWidth color="primary" onClick={onSubmit}>
            Save
          </Button>
        </Stack>
      </FormProvider>
    </Drawer>
  );
}
