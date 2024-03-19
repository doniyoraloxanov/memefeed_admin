import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Verification } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { updateVerificationAction } from 'src/app/actions/verification';
import { VerificationSchema, verificationFormValues } from 'src/app/constants';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

type Props = {
  currentVerification: Verification;
};

export default function VerificationsNewEditForm({ currentVerification }: Props) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const defaultValue = useMemo(
    () => ({
      id: currentVerification?.id || '',
      title: currentVerification?.title || '',
      shortDescription: currentVerification?.shortDescription || '',
      description: currentVerification?.description || '',
      rewardAmount: currentVerification?.rewardAmount || 0,
      icon: currentVerification?.icon || '',
      payload: currentVerification?.payload || '',
      url: currentVerification?.url || '',
    }),
    [currentVerification]
  );

  const methods = useForm<verificationFormValues>({
    defaultValues: defaultValue,
    resolver: zodResolver(VerificationSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateVerificationAction(data);
      reset();
      enqueueSnackbar('Update success!');
      router.push(paths.dashboard.verification.root);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Name, short description, url...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={5} sx={{ p: 3 }}>
            <Typography variant="h5">Update Verification</Typography>
            <RHFTextField name="title" label="Title" />
            <RHFTextField name="shortDescription" label="ShortDescription" />
            <RHFTextField name="description" label="Description" multiline rows={2} />
            <RHFTextField
              name="rewardAmount"
              label="RewardAmount"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <RHFTextField name="icon" label="Icon" />
            <RHFTextField name="payload" label="Payload" />
            <RHFTextField name="url" label="Url" />
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid
        xs={12}
        md={8}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          Update Verification
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}
        {renderActions}
      </Grid>
    </FormProvider>
  );
}
