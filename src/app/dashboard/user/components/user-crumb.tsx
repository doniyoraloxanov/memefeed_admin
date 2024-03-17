import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

const UserCrumb = () => {
  return (
    <CustomBreadcrumbs
      heading="List"
      links={[
        { name: 'Dashboard', href: paths.dashboard.root },
        { name: 'Users', href: paths.dashboard.user.root },
        { name: 'List' },
      ]}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    />
  );
};

export default UserCrumb;
