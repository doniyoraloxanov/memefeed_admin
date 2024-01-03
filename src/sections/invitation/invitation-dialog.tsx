import { FC } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

import AsynchronousTextField from './asynchronous-textfield';

// ----------------------------------------------------------------------

type InviationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const InviationDialog: FC<InviationDialogProps> = ({ isOpen, onClose, title }) => {
  const dialog = useBoolean();

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <AsynchronousTextField />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={dialog.onFalse} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviationDialog;
