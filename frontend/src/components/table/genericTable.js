import React, { lazy, Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TablePagination,
  TableCell,
  TableSortLabel,
  Button,
} from '@mui/material';
import { tableStyle } from './style';

const EditUser = lazy(() => import('../edit/editUser'));
const DeleteUser = lazy(() => import('../delete/deleteUser'));

const GenericTable = (props) => {
  const {
    data,
    actions,
    columns,
    order,
    orderBy,
    handleOnSort,
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    rowsPerPageOptions,
    userEditDialog,
    userRemoveDialog,
    handleOnUserRemoveDialog,
    handleOnUserEditDialog,
  } = props;

  console.log('data', data);
  const [oldData, setOldData] = useState({});

  const handleOnOldData = (dataItem) => {
    setOldData(dataItem);
  };

  return (
    <>
      <Suspense fallback={<div>Loading......</div>}>
        <EditUser
          userEditDialog={userEditDialog}
          onClose={handleOnUserEditDialog}
          onSubmit={handleOnUserEditDialog}
          data={oldData}
        />
      </Suspense>
      <Suspense fallback={<div>Loading......</div>}>
        <DeleteUser
          userRemoveDialog={userRemoveDialog}
          onClose={handleOnUserRemoveDialog}
          onSubmit={handleOnUserRemoveDialog}
          data={oldData}
        />
      </Suspense>
      <TableContainer style={tableStyle.tableContainer}>
        <Table style={tableStyle.table}>
          <TableHead>
            <TableRow>
              {columns.map(({ label, value }, i) => (
                <TableCell
                  align="center"
                  style={tableStyle.tableCell}
                  key={`columns${i+1}`}
                >
                  <TableSortLabel
                    active={orderBy === value}
                    direction={orderBy === value ? order : 'asc'}
                    onClick={() => handleOnSort(value)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& .MuiTableRow-root:hover': {
                backgroundColor: '#DCDCDC',
              },
            }}
          >
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dataItem, index) => (
                <TableRow
                  align="center"
                  sx={
                    index % 2
                      ? { background: 'white' }
                      : { background: '#F0F0F0' }
                  }
                  key={`data${index}`}
                  onClick={() =>
                    (dataItem?.url)
                      ? window.open(
                          dataItem?.url,
                          '_blank',
                          'noreferrer'
                        )
                      : ''
                  }
                >
                  {columns.map(({ value, format }, iconColIndex) =>
                    value === 'Icon' ? (
                      <TableCell
                        style={tableStyle.tableRow}
                        align="center"
                        key={`iconColIndex${iconColIndex+1}`}
                      >
                        {actions?.map(({ Icon, handler }, iconIndex) => (
                          <Button
                            color="inherit"
                            style={{ marginTop: '5px' }}
                            key={`icon${iconIndex+1}`}
                            align="center"
                            onClick={() => {
                              handler();
                              handleOnOldData(dataItem);
                            }}
                          >
                            <Icon
                              style={{ padding: '10px -1px -2px -1px' }}
                              variant="contained"
                              onClick={() => {}}
                              data={dataItem}
                              index={index}
                            />
                          </Button>
                        ))}
                      </TableCell>
                    ) : (
                      <TableCell key={Math.random()} align="center">
                        {format ? format(dataItem[value]) : dataItem[value]}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          align="right"
          component="div"
          count={data?.length}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </TableContainer>
    </>
  );
};

GenericTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.arrayOf(PropTypes.object),
  order: PropTypes.string,
  orderBy: PropTypes.string,
  handleOnSort: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  batchEditDialog: PropTypes.bool,
  batchRemoveDialog: PropTypes.bool,
  userEditDialog: PropTypes.bool,
  userRemoveDialog: PropTypes.bool,
  shuflleReviewers: PropTypes.bool,
  handleOnShuffleReviewers: PropTypes.func,
  handleOnUserRemoveDialog: PropTypes.func,
  handleOnUserEditDialog: PropTypes.func,
  handleOnBatchEditDialog: PropTypes.func,
  handleOnBatchRemoveDialog: PropTypes.func,
};

GenericTable.defaultProps = {
  data: [],
  columns: [],
  actions: [],
  order: 'ase',
  orderBy: '',
  page: 0,
  rowsPerPage: 0,
  rowsPerPageOptions: [],
  onPageChange: () => {},
  onRowsPerPageChange: () => {},
  handleOnSort: () => {},
  batchEditDialog: false,
  batchRemoveDialog: false,
  userEditDialog: false,
  userRemoveDialog: false,
  shuflleReviewers: false,
  handleOnShuffleReviewers: () => {},
  handleOnUserRemoveDialog: () => {},
  handleOnUserEditDialog: () => {},
  handleOnBatchEditDialog: () => {},
  handleOnBatchRemoveDialog: () => {},
};

export default GenericTable;
