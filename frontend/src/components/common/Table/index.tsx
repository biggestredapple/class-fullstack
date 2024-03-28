import React, { useMemo, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableComponenteStyle } from './index.style';
import { Recipe } from 'models';

type TableComponentProps = {
  recipes: Recipe[];
  perPage?: number;
  pageNum?: number;
  totalNum?: number;
  paginationChange: (perPage: number, pageNum: number) => void;
  itemClick: (uuid: number) => void;
  deleteItem: (index: number) => void;
};

const defaultRows = ['title', 'instructions', 'ingredients'];

export const TableComponent: React.FC<TableComponentProps> = (props) => {
  const { recipes, perPage, pageNum, totalNum, paginationChange, itemClick, deleteItem } = props;

  const [page, setPage] = useState(pageNum ?? 0);
  const [rowsPerPage, setRowsPerPage] = useState(perPage ?? 10);

  const tableFields = useMemo(() => {
    return recipes.length === 0? defaultRows: Object.keys(recipes[0]);
  }, [recipes]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    paginationChange(rowsPerPage, newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    paginationChange(parseInt(event.target.value, 10), 0);
  };

  return <TableComponenteStyle>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableCell> NO </TableCell>
          {
            tableFields.map((field) => <TableCell> {field.toUpperCase()} </TableCell>)
          }
          <TableCell> ACTIONS </TableCell>
        </TableHead>
        <TableBody>
          {
            recipes.map((row, index) => {
              const data = Object.values(row);
              return (
                <TableRow>
                  <TableCell> {index + 1} </TableCell>
                  {
                    data.map((value) => {
                      if (Array.isArray(value)) {
                        return (<TableCell> {value.join(', ')} </TableCell>)
                      }
                      return (<TableCell> {value} </TableCell>)
                    })
                  }
                  <TableCell>
                    <Stack spacing={2} direction='row'>
                      <EditIcon className='cursor-pointer' onClick={() => itemClick(index)} />
                      <DeleteIcon className='cursor-pointer' onClick={() => deleteItem(index)} />
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      component='div'
      count={totalNum ?? 100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </TableComponenteStyle>
}