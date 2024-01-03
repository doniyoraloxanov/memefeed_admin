'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import InviationDialog from './invitation-dialog';

// ----------------------------------------------------------------------

export default function Inviation() {
  const [invitationOpen, setInvitationOpen] = useState(false);
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Inviation"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Inviation', href: paths.dashboard.invitation },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setInvitationOpen(!invitationOpen)}
          >
            Create invitation
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      />

      <InviationDialog
        isOpen={invitationOpen}
        onClose={() => setInvitationOpen(!invitationOpen)}
        title="Create invitation"
      />
    </Container>
  );
}
