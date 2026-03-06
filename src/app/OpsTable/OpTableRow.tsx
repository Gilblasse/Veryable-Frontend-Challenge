import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { OpsDataType } from './helper';
import OperatorDetailsRow from './OperatorDetailsRow';
import { DATA_HEADERS } from './tableConstants';


export default function OpTableRow(props: { op: OpsDataType }) {
  const { op } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {
          DATA_HEADERS.map((header) => (
            <TableCell key={header.dataIndex} align={header.align}>
              {op[header.dataIndex]}
            </TableCell>
          ))
        }
      </TableRow>

      <OperatorDetailsRow operators={op.operators} open={open} opPublicId={op.publicId} />
    </>
  );
}