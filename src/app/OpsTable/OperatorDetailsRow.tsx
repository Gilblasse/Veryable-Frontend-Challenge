import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { getCheckIn, setCheckIn } from './checkInStorage';
import { OpsDataType } from './helper';
import { OPERATOR_HEADERS } from './tableConstants';


export default function OperatorDetailsRow(props: { operators: OpsDataType['operators'], open: boolean, opPublicId: string }) {
  const { operators, open, opPublicId } = props;

  const [checkIns, setCheckIns] = useState<Record<number, boolean>>(()=> {
    return operators.reduce((acc,operator) => {
      acc[operator.id] = getCheckIn(opPublicId, operator.id);
      return acc;
    },{} as Record<number, boolean>);
  });


  function handleToggleCheckIn(operatorId: number) {
    const newValue = !checkIns[operatorId];
    setCheckIn(opPublicId, operatorId, newValue);
    setCheckIns((prev) => ({ ...prev, [operatorId]: newValue }));
  }

  function renderOperatorCell(header: typeof OPERATOR_HEADERS[number], operator: OpsDataType['operators'][number]) {
    switch (header.dataIndex) {
      case 'endorsements':
        return operator[header.dataIndex].join(', ');
      case 'reliability':
        return `${operator[header.dataIndex]}%`;
      case 'checkIn':
        return (
          <Button
            variant={checkIns[operator.id] ? 'contained' : 'outlined'}
            color={checkIns[operator.id] ? 'success' : 'primary'}
            size="small"
            onClick={() => handleToggleCheckIn(operator.id)}
          >
            {checkIns[operator.id] ? 'Check Out' : 'Check In'}
          </Button>
        );
      default:
        return operator[header.dataIndex];
    }
  }

  return (
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 2, mb: 5 }}>
              <Stack spacing={2}>
                <Typography variant="h6" gutterBottom component="div">
                  OPERATORS
                </Typography>


                <Table size="small" aria-label="purchases">
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      {OPERATOR_HEADERS.map((header) => (
                        <TableCell key={header.dataIndex} sx={{ fontWeight: 'bold' }}>
                          {header.headerTitle}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {operators.map((operator) => (
                      <TableRow key={operator.id}>
                        {OPERATOR_HEADERS.map((header) => (
                          <TableCell key={header.dataIndex} component="th" scope="row">
                            {renderOperatorCell(header, operator)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
  )
}