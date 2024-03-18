import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

const AdsCrumb = () => {
  return (
    <CustomBreadcrumbs
      heading="Create Ads"
      links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Create' }]}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    />
  );
};

export default AdsCrumb;
