'use client';

import { User } from '@prisma/client';
import { useRouter, usePathname } from 'next/navigation';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { fDateTime } from 'src/utils/format-time';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'firstName',
    headerName: 'Name',
    flex: 1,
    valueGetter(params) {
      const value = params.row.firstName;
      return `${value} ${params.row.lastName}`;
    },
  },
  {
    field: 'role',
    headerName: 'role',
    flex: 1,
  },
  {
    field: 'isVerified',
    headerName: 'Verification Status',
    flex: 1,
  },
  {
    field: 'languageCode',
    headerName: 'Language',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Joined',
    flex: 1,
    valueGetter(params) {
      const value = params.row.createdAt;
      return fDateTime(value);
    },
  },
];

export default function UserListView({ users, total }: { users: User[]; total: number }) {
  const settings = useSettingsContext();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.list },
          { name: 'List' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <DataGrid
          rowCount={total}
          rows={users}
          columns={columns}
          disableRowSelectionOnClick
          onPaginationModelChange={(model) => {
            router.push(`${pathname}?page=${model.page}&pageSize=${model.pageSize}`);
          }}
          pagination
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          paginationMode="server"
        />
      </Card>
    </Container>
  );
}
