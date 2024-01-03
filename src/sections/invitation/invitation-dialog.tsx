import { FC } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { createInvitationAction } from './actions';
import { InvitationFormValues, invitationFormSchema } from './constants';

type InvitationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const InvitationDialog: FC<InvitationDialogProps> = ({ isOpen, onClose, title }) => {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<InvitationFormValues>({
    defaultValues: {
      source: '',
      rewardAmount: 0,
      comment: '',
    },
    resolver: zodResolver(invitationFormSchema),
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    const createdInvitation = await createInvitationAction(data);

    if (createdInvitation) {
      onClose();
    }

    enqueueSnackbar('Invitation created', { variant: 'success' });
  });

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <FormProvider methods={methods}>
          <Stack gap={1} sx={{ py: 1 }}>
            <RHFTextField name="source" label="Source" required />
            <RHFTextField type="number" name="rewardAmount" label="Reward Amount" required />
            <RHFTextField multiline minRows={2} name="comment" label="Comment" />
          </Stack>
        </FormProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <LoadingButton onClick={onSubmit} variant="contained">
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default InvitationDialog;
