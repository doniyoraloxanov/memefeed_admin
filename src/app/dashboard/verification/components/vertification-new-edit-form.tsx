import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { updateVerification } from 'src/app/actions/verification';
import {
  VerificationFormDefaultValues,
  VerificationSchema,
  verificationFormValues,
} from 'src/app/constants';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

type Props = {
  toggleOpen: () => void;
  userId: string;
};

export default function VerificationNewEditForm({ toggleOpen, userId }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<verificationFormValues>({
    defaultValues: VerificationFormDefaultValues,
    resolver: zodResolver(VerificationSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await updateVerification(
      data.title,
      data.shortDescription,
      data.description,
      data.rewardAmount,
      data.icon,
      data.payload,
      data.url
    );
    reset();
    enqueueSnackbar('Update success!');
    toggleOpen();
  });

  const renderDetails = (
    <>
      <Stack spacing={4} sx={{ p: 3 }}>
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

        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          Update
        </LoadingButton>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderDetails}
    </FormProvider>
  );
}
