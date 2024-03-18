'use client';

import { Ads } from '@prisma/client';
import { useSnackbar } from 'notistack';
import { useRouter, usePathname } from 'next/navigation';

import { Card, Container } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';

import { deleteAds } from 'src/app/actions/ads';
import AdsCrumb from 'src/app/dashboard/ads/components/ads-crumb';
import {
  RenderCellProduct,
  RenderCellCreatedAt,
} from 'src/app/dashboard/ads/components/ads-table-row';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

export default function AdsListView({ ads, total }: { ads: Ads[]; total: number }) {
  const settings = useSettingsContext();
  const router = useRouter();
  const pathname = usePathname();

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteRow = async (id: string) => {
    enqueueSnackbar('Delete success!');
    await deleteAds(id);
  };

  const columns: GridColDef[] = [
    {
      field: 'imageUrl',
      headerName: 'Title',
      flex: 1,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'url',
      headerName: 'Url',
      flex: 1,
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
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.id);
          }}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <AdsCrumb />

      <Card>
        <DataGrid
          rowCount={total}
          rows={ads}
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
