import { Prisma } from '@prisma/client';

import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import Label from 'src/components/label';

type Props = {
  selected: boolean;
  row: Prisma.UserGetPayload<{}>;
};

export default function UserTableRow({ row, selected }: Props) {
  const { firstName, lastName, username, status, role, languageCode, level } = row;

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
        <Label variant="soft" color="default">
          {status}
        </Label>
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{languageCode}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{level}</TableCell>
    </TableRow>
  );
}
