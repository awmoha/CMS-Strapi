import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  Box,
  TableSortLabel,
} from '@material-ui/core';
import { visuallyHidden } from '@mui/utils';

const EnhancedTableHead = (props) => {
  const {
    headCells,
    order,
    orderBy,
    onRequestSort,
    adminRole
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells
          .filter((item) => {
            if (!adminRole && item.adminRequired) {
              return false;
            }
            return true;
          })
          .map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
              align={headCell.numeric ? 'center' : 'left'}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                disabled={headCell.disableSort}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string.isRequired,
  adminRole: PropTypes.bool.isRequired,
};

export default EnhancedTableHead;
