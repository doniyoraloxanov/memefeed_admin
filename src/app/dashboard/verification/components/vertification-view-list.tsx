'use client';

import { Card, Container } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Verification } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import VertificationCrumb from 'src/app/dashboard/verification/components/vertification-crumb';
import { RenderCellCreatedAt } from 'src/app/dashboard/verification/components/vertification-table-row';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

export default function VerificationListView({
  verifications,
  total,
  toggleOpen,
  setUserId,
}: {
  verifications: Verification[];
  total: number;
  toggleOpen: () => void;
  setUserId: (userId: string) => void;
}) {
  const settings = useSettingsContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleEditRow = async (id: string) => {
    console.log('USER ID', typeof id);
    toggleOpen();
    setUserId(id.toString());
  };

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'shortDescription',
      headerName: 'ShortDescription',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'rewardAmount',
      headerName: 'Permission key',
      flex: 1,
    },
    { field: 'payload', headerName: 'payload', flex: 1 },
    { field: 'url', headerName: 'Url', flex: 1 },

    {
      field: 'createdAt',
      headerName: 'Create at',
      flex: 1,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.userId)}
        />,
      ],
    },
  ];

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <VertificationCrumb />
        <Card>
          <DataGrid
            rowCount={total}
            rows={verifications}
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
    </>
  );
}
