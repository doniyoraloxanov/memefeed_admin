import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Label from 'src/components/label';

import { Prisma, UserStatus } from '@prisma/client';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: Prisma.UserGetPayload<{}>;
};

export default function UserTableRow({ row, selected }: Props) {
  const { firstName, lastName, username, status, role, source } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={firstName} sx={{ mr: 2 }} />

        <ListItemText
          primary={firstName}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{lastName}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{username}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === UserStatus.ACTIVE && 'success') ||
            (status === UserStatus.DELETED && 'warning') ||
            (status === UserStatus.BANNED && 'error') ||
            'default'
          }
        >
          {status}
        </Label>
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{source}</TableCell>
    </TableRow>
  );
}
