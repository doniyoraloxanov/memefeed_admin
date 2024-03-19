import { Prisma } from '@prisma/client';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

type Props = {
  selected: boolean;
  row: Prisma.UserGetPayload<{}>;
};

export default function VerificationsTableRow({ row, selected }: Props) {
  const { firstName, lastName, username, role, languageCode } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
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

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{languageCode}</TableCell>
    </TableRow>
  );
}
