import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { Button } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { RouterLink } from 'src/routes/components';

const AdsCrumb = () => {
  return (
    <CustomBreadcrumbs
      heading="List"
      links={[
        { name: 'Dashboard', href: paths.dashboard.root },
        { name: 'Ads', href: paths.dashboard.ads.root },
        { name: 'List' },
      ]}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.ads.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New Ads
        </Button>
      }
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    />
  );
};

export default AdsCrumb;
