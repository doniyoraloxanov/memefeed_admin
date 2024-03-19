'use client';

import { useCallback } from 'react';
import { Verification } from '@prisma/client';
import { useRouter, usePathname } from 'next/navigation';

import { Card, Switch, Container, FormControlLabel } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { updateIsCompletedAction } from 'src/app/actions/verification';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { RenderCellCreatedAt } from '../../ads/components/ads-table-row';

export default function VerificationsListView({
  verifications,
  total,
}: {
  verifications: Verification[];
  total: number;
}) {
  const settings = useSettingsContext();
  const router = useRouter();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();

  const handleSwitchToggle = async (id: string) => {
    const verificationToUpdate = verifications.find((verification) => verification.id === id);
    if (!verificationToUpdate) return;

    const newIsCompletedValue = !verificationToUpdate.isCompleted;

    try {
      await updateIsCompletedAction(newIsCompletedValue, id);
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error('Error updating isCompleted status:', error);
    }
  };

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.verification.edit(id));
    },
    [router]
  );

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
      headerName: 'RewardAmount',
      flex: 1,
    },
    { field: 'payload', headerName: 'payload', flex: 1 },
    { field: 'url', headerName: 'Url', flex: 1 },
    {
      field: 'isCompleted',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Switch
              checked={params.row.isCompleted}
              onChange={() => handleSwitchToggle(params.row.id)}
            />
          }
          label=""
        />
      ),
    },

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
          onClick={() => handleEditRow(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'verification', href: paths.dashboard.verification.root },
          { name: 'List' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <DataGrid
          rowCount={total}
          rows={verifications}
          columns={columns}
          disableRowSelectionOnClick
          onPaginationModelChange={(model) => {
            console.log(model);
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
