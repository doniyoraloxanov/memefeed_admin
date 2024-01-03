import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import Label from 'src/components/label';

import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: IUserItem;
};

export default function UserTableRow({ row, selected }: Props) {
  const { firstName, lastName, userName, status, role } = row;

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

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{userName}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === 'active' && 'success') ||
            (status === 'pending' && 'warning') ||
            (status === 'banned' && 'error') ||
            'default'
          }
        >
          {status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
