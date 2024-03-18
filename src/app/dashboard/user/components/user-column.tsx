import { GridColDef } from '@mui/x-data-grid';

import { fDateTime } from 'src/utils/format-time';

export const columns: GridColDef[] = [
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
