'use client';

import Container from '@mui/material/Container';
import AdsNewEditForm from 'src/app/dashboard/ads/new/components/ads-new-edit-form';
import AdsCrumb from 'src/app/dashboard/ads/new/components/ads-crumb';
import { useSettingsContext } from 'src/components/settings';

export default function AdsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <AdsCrumb />
      <AdsNewEditForm />
    </Container>
  );
}
