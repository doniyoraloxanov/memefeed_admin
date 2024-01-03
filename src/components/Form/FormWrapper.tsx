import { type FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import classnames from 'classnames/bind';

import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import styles from './form-wrapper.module.scss';

interface FormWrapperProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  formTitle?: string;
  className?: string;
  loading?: boolean;
  buttonTitle?: string;
}

const cn = classnames.bind(styles);

const FormWrapper: FC<FormWrapperProps> = ({
  onSubmit,
  children,
  formTitle,
  className,
  buttonTitle = 'Saqlash',
  loading = false,
}) => (
  <Box component="form" noValidate onSubmit={onSubmit} className={cn('form', className)}>
    <Typography variant="h5">{formTitle}</Typography>
    {children}

    <LoadingButton
      type="submit"
      variant="contained"
      fullWidth
      loading={loading}
      className={cn('form__button')}
    >
      {buttonTitle}
    </LoadingButton>
  </Box>
);

export default FormWrapper;
