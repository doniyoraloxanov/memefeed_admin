'use client';

import { useState } from 'react';
import { Ad } from '@prisma/client';
import { Icon } from '@iconify/react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Container, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useSnackbar } from 'src/components/snackbar';
import AdsDrawer from 'src/components/ads/drawer/ads-drawer';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { deleteAd } from '../actions';

export default function AdsView({ ads, total }: { ads: Ad[]; total: number }) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adId, setAdId] = useState('');

  const onClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'icon',
      headerName: 'Icon',
      flex: 1,
      renderCell: (params) =>
        // eslint-disable-next-line no-nested-ternary
        params.value === 'info' ? (
          <Icon icon="flat-color-icons:info" width={30} height={30} />
        ) : // eslint-disable-next-line no-nested-ternary
        params.value === 'coin' ? (
          <Icon icon="pepicons-pencil:coins-circle-filled" width={30} height={30} />
        ) : params.value === 'telegram' ? (
          <Icon icon="arcticons:telegram-alt-2" width={30} height={30} />
        ) : (
          <Icon icon="cryptocurrency-color:usdt" width={30} height={30} />
        ),
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 2,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
    },
    {
      field: 'url',
      headerName: 'Url',
      flex: 2,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,

      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => {
            setDialogOpen(true);
            setAdId(params.value as string);
          }}
        >
          <Icon icon="gravity-ui:trash-bin" />
        </IconButton>
      ),
    },
  ];

  return (
    <Container>
      <ConfirmDialog
        open={dialogOpen}
        title="Delete Advertisement"
        content="Are you sure you want to delete this item? This action cannot be undone. Please confirm your decision below."
        action={
          <Button
            variant="contained"
            onClick={() => {
              deleteAd(adId);
              setDialogOpen(false);
              enqueueSnackbar('Ad deleted successfully', { variant: 'success' });
            }}
          >
            Delete
          </Button>
        }
        onClose={() => {
          setDialogOpen(false);
        }}
      />
      <AdsDrawer open={open} onClose={onClose} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomBreadcrumbs
          heading="Advertisement List"
          links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Create
        </Button>
      </Box>
      <DataGrid
        rowCount={total}
        rows={
          ads.map((ad) => ({
            id: ad.id,
            icon: ad.imageUrl,
            title: ad.title,
            description: ad.description,
            url: ad.url,
            actions: ad.id,
          })) as any
        }
        columns={columns}
        disableRowSelectionOnClick={false}
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
    </Container>
  );
}
