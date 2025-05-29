import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Pagination, Stack
} from '@mui/material';
import Chip from '@mui/material/Chip';

function ReusableTable({
  columns = [],
  rows = [],
  onActionClick = () => {},
  pagination = { count: 1, page: 1, onChange: () => {} },
  loading = false
}) {
  return (
    <div style={{ position: 'relative', minHeight: '500px' }}>
      <TableContainer component={Paper} style={{ marginTop: 10 }}>
        <Table sx={{ minWidth: 650 }} aria-label="reusable table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#90d6ff' }}>
              {columns.map((col, idx) => (
                <TableCell key={idx} align={col.align || 'left'} sx={{ fontWeight: 'bold', color: 'black' }}>
                  {col.label}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'black' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} align={col.align || 'left'}>
                      {col.field === 'TrangThai' ? (
                        <Chip
                          label={row[col.field]}
                          color={row[col.field] === 'Hoạt động' ? 'success' : 'error'}
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        row[col.field]
                      )}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <span
                      className="bi bi-eye-fill"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onActionClick(row)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination cố định ở dưới cùng bên phải */}
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <Pagination
          count={pagination.count}
          page={pagination.page}
          onChange={pagination.onChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default ReusableTable;
