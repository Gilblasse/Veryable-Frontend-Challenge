"use client"

import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { fetchFrontEndChallengeData } from '../api';
import { OpsDataType, sanitizedOperationalData } from './helper';
import OpTableRow from './OpTableRow';
import { TABLE_HEADERS } from './tableConstants';


export default function OpsTable() {
  const [ops, setOps] = useState<Array<OpsDataType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFrontEndChallengeData();
        setOps(sanitizedOperationalData(data));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} style={{ width: 1200 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableCell key={header.headerTitle} align={header.align}>
                {header.headerTitle}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <TableRow key={i}>
                  {TABLE_HEADERS.map((_, idx) => (
                    <TableCell key={idx}>
                      <Skeleton variant="rectangular" width="100%" height={25} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : ops.map((op) => (
                <OpTableRow key={op.opTitle} op={op} />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}