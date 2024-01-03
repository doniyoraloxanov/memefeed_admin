'use client';

import { useCallback, useState } from 'react';

import {
  Button,
  IconButton,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import { Prisma } from '@prisma/client';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  emptyRows,
  useTable,
} from 'src/components/table';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { fDateTime } from 'src/utils/format-time';
import { removeInvitationAction } from './actions';
import InvitationDialog from './invitation-dialog';

const TABLE_HEAD = [
  { id: 'id', label: 'Id (source)' },
  { id: 'rewardAmount', label: 'Reward Amount' },
  { id: 'comment', label: 'Comment' },
  { id: 'total', label: 'Total joined via' },
  { id: 'createAt', label: 'Created At' },
  { id: 'link', label: 'Link' },
  { id: 'actions', label: 'Actions' },
];

type Props = {
  row: Prisma.InvitationGetPayload<{ include: { _count: { select: { usersJoined: true } } } }>;
  selected: boolean;
};

function InvitationTableRow({ row, selected }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();
  const {
    id,
    comment,
    link,
    rewardAmount,
    createdAt,
    _count: { usersJoined: totalUsersJoined },
  } = row;

  const handleCopy = useCallback(
    (linkToCopy: string) => {
      enqueueSnackbar('Copied!');
      copy(linkToCopy);
    },
    [enqueueSnackbar, copy]
  );

  const onRemove = (invitationId: string) => async () => {
    await removeInvitationAction(invitationId);

    enqueueSnackbar('Invitation removed', { variant: 'success' });
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemText
          primary={id}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{rewardAmount}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{comment}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{totalUsersJoined}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDateTime(createdAt)}</TableCell>

      <TableCell sx={{ p: 0 }}>
        <Button startIcon={<Iconify icon="eva:link-2-fill" />} onClick={() => handleCopy(link)}>
          Copy link
        </Button>
      </TableCell>
      <TableCell sx={{ p: 0 }}>
        <IconButton onClick={onRemove(row.id)} color="error">
          <Iconify icon="eva:trash-2-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default function Invitation({
  data,
}: {
  data: Prisma.InvitationGetPayload<{ include: { _count: { select: { usersJoined: true } } } }>[];
}) {
  const [invitationOpen, setInvitationOpen] = useState(false);
  const settings = useSettingsContext();
  const table = useTable();

  const denseHeight = table.dense ? 56 : 56 + 20;
  const notFound = !data?.length;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Invitation"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Invitation', href: paths.dashboard.invitation },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setInvitationOpen(!invitationOpen)}
          >
            Create invitation
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={data.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {data
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <InvitationTableRow
                      key={row.id.toString()}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, data.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Box>

      <InvitationDialog
        isOpen={invitationOpen}
        onClose={() => setInvitationOpen(!invitationOpen)}
        title="Create invitation"
      />
    </Container>
  );
}
