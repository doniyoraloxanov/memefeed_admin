'use client';

import { Verification } from '@prisma/client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import VerificationsNewEditForm from 'src/app/dashboard/verification/components/verification-new-edit-form';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

type Props = {
  currentVerification: Verification;
};

export default function VerificationEditView({ currentVerification }: Props) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Verification',
            href: paths.dashboard.verification.root,
          },
          { name: 'Update verification' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <VerificationsNewEditForm currentVerification={currentVerification} />
    </Container>
  );
}
