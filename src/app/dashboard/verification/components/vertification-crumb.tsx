import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

const VertificationCrumb = () => {
  return (
    <CustomBreadcrumbs
      heading="List"
      links={[
        { name: 'Dashboard', href: paths.dashboard.root },
        { name: 'Verifications', href: paths.dashboard.verification.root },
        { name: 'List' },
      ]}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    />
  );
};

export default VertificationCrumb;
