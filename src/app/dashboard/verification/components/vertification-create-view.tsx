'use client';

import { Container } from '@mui/material';
import { Verification } from '@prisma/client';
import { useState } from 'react';
import VerificationNewEditForm from 'src/app/dashboard/verification/components/vertification-new-edit-form';
import VerificationListView from 'src/app/dashboard/verification/components/vertification-view-list';
import RightDrawer from 'src/components/right-drawer';
import { useSettingsContext } from 'src/components/settings';

export default function VerificationCreateView({
  verifications,
  total,
}: {
  verifications: Verification[];
  total: number;
}) {
  const settings = useSettingsContext();
  const [verOpen, setVerOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const toggleOpen = () => {
    setVerOpen(!verOpen);
  };

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <RightDrawer isOpen={verOpen} onClose={toggleOpen}>
          <VerificationNewEditForm toggleOpen={toggleOpen} userId={userId} />
        </RightDrawer>
        <VerificationListView
          verifications={verifications}
          total={total}
          toggleOpen={toggleOpen}
          setUserId={setUserId}
        />
      </Container>
    </>
  );
}
