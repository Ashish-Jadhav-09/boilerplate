import React, {
  useState, useEffect, lazy, Suspense, useCallback,
} from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { Edit, Delete, Search } from '@mui/icons-material';
import {
  userManagementSearchBar,
  addUserButton,
  userManagementTableColumn,
} from './helper';
import { GET_ALL_USERS } from '../../../apolloClient';
import {
  SearchBar,
  SearchIconWrapper,
  StyledInputBase,
} from '../adminDashboard/helper';
import { handleOnTableDataSort } from '../../../config/constant';

const GenericTable = lazy(() => import('../../../components/table/genericTable'));
const AddSingleUser = lazy(() => import('./addSingleUser'));

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

  const getFilterData = () => data?.getUserData?.filter((element) => element.firstName.toLowerCase().includes(filterData.toLowerCase()));

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <h2 style={{ marginLeft: '2rem', fontSize: '2rem' }}>User Management </h2>
      <Suspense fallback={<div>Loading....</div>}>
        <AddSingleUser
          open={isDialogOpen}
          onClose={() => setisDialogOpen(false)}
          onSubmit={() => setisDialogOpen(false)}
        />
      </Suspense>
      <Suspense fallback={<div>Loading....</div>} />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid item xl="auto">
          <SearchBar sx={userManagementSearchBar}>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              id="outlined-basic"
              sx={{ borderBottom: '1px solid' }}
              label="search"
              variant="outlined"
              placeholder="User Name"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => {
                setFilterdata(event.target.value.trim());
              }}
            />
          </SearchBar>
        </Grid>
        <Grid item xl="auto">
          <Button
            variant="contained"
            style={addUserButton}
            onClick={() => setisDialogOpen(true)}
          >
            Add User
          </Button>
        </Grid>
      </Grid>
      <Suspense fallback={<div>Loading....</div>}>
        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '1rem 1rem 1rem 1rem',
          }}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="overline">
              User TABLE
            </Typography>
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
          </CardContent>
        </Card>
      </Suspense>
      <br />
    </>
  );
};

export default UserManagement;
