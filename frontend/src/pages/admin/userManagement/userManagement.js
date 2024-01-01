import React, { useState, useEffect, lazy, Suspense } from 'react';
import { CircularProgress, Grid, Tooltip, Typography, useTheme } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Edit, Delete, Search } from '@mui/icons-material';
import {
  userManagementTableColumn,
  userStatistics,
  getUserManagementSearchBarStyles,
  getButtonStyles,
} from './helper';
import { GET_ALL_USERS } from '../../../apolloClient';
import {
  SearchBar,
  SearchIconWrapper,
  StyledInputBase,
} from '../adminDashboard/helper';
import { handleOnTableDataSort } from '../../../config/constant';
import { content } from './content';
import { useThemeContext } from '../../../context';

const GenericTable = lazy(() =>
  import('../../../components/table/genericTable')
);
const AddSingleUser = lazy(() => import('./components/addSingleUser'));
const UserStatistics = lazy(() => import('./components/userStatistics'));

const EditIcon = () => (
  <Tooltip title="Edit User">
    <Edit />
  </Tooltip>
);

const DeleteIcon = () => (
  <Tooltip title="Delete User">
    <Delete />
  </Tooltip>
);

const UserManagement = () => {
  const theme = useTheme();
  const { darkMode } = useThemeContext();

  const [userTableData, setUserTableData] = useState([]);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [userEditDialog, setUserEditDialog] = useState(false);
  const [userRemoveDialog, setUserRemoveDialog] = useState(false);
  const [filterData, setFilterdata] = useState('');
  const [order, setSortOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('status');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
    setPage(0);
  };

  const handleOnSort = (value) => {
    setOrderBy(value);
    const tableDataSort = handleOnTableDataSort(orderBy, order);
    userTableData.sort(tableDataSort);
    if (order === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
  };

  const { data = {}, refetch } = useQuery(GET_ALL_USERS, {
    variables: {
      role: 'general',
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    setUserTableData(data?.getUserData);
  }, [data?.getUserData]);

  const getFilterData = () =>
    data?.getUserData?.filter((element) =>
      element.firstName.toLowerCase().includes(filterData.toLowerCase())
    );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Grid container rowSpacing={2.5}>
        {userStatistics.map(({ title, color, count, extra, percentage }) => (
          <Grid key={title} item xs={11} sm={6} md={4} lg={3}>
            <UserStatistics
              title={title}
              count={count}
              percentage={percentage}
              color={color}
              extra={extra}
            />
          </Grid>
        ))}
      </Grid>
      <Suspense fallback={<CircularProgress />}>
        <AddSingleUser
          open={isDialogOpen}
          onClose={() => setisDialogOpen(false)}
          onSubmit={() => setisDialogOpen(false)}
        />
      </Suspense>
      <Suspense fallback={<CircularProgress />}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1rem',
          }}
        >
          <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
            {content.USER_TABLE}
          </Typography>
          <div style={{ display: 'flex' }}>
            <SearchBar sx={getUserManagementSearchBarStyles(theme, darkMode)}>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                id="outlined-basic"
                label="search"
                variant="outlined"
                placeholder={content.USER_NAME}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => {
                  setFilterdata(event.target.value.trim());
                }}
              />
            </SearchBar>
            <button
              style={getButtonStyles(theme, darkMode)}
              onClick={() => setisDialogOpen(true)}
            >
              {content.ADD_USER}
            </button>
          </div>
        </div>
        <div
          style={{
            margin: '1rem',
            border: `1px solid ${
              darkMode ? theme.palette.divider : '#BDBDBD'
            }`,
            borderRadius: '5px',
          }}
        >
          <GenericTable
            columns={userManagementTableColumn}
            data={getFilterData() || userTableData}
            actions={[
              {
                Icon: EditIcon,
                handler: () => setUserEditDialog(true),
              },
              {
                Icon: DeleteIcon,
                handler: () => setUserRemoveDialog(true),
              },
            ]}
            userEditDialog={userEditDialog}
            userRemoveDialog={userRemoveDialog}
            handleOnUserEditDialog={() => setUserEditDialog(false)}
            handleOnUserRemoveDialog={() => setUserRemoveDialog(false)}
            order={order}
            orderBy={orderBy}
            handleOnSort={handleOnSort}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 30]}
          />
        </div>
      </Suspense>
      <br />
    </>
  );
};

export default UserManagement;
