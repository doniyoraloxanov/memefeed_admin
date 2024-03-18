'use client';

import { User } from '@prisma/client';
import { useRouter, usePathname } from 'next/navigation';

import { DataGrid } from '@mui/x-data-grid';
import { Card, Container } from '@mui/material';

import UserCrumb from 'src/app/dashboard/user/components/user-crumb';
import { columns } from 'src/app/dashboard/user/components/user-column';

import { useSettingsContext } from 'src/components/settings';

export default function UserListView({ users, total }: { users: User[]; total: number }) {
  const settings = useSettingsContext();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <UserCrumb />

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
