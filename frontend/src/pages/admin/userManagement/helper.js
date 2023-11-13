import * as yup from 'yup';

export const userManagementSearchBar = {
  left: '10px',
};

export const addUserButton = {
  marginRight: '10px',
  padding: '10px 20px',
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '10px',
};

export const addBulkUsersButton = {
  marginRight: '20px',
  backgroundColor: 'white',
  padding: '10px 20px',
  color: 'black',
  borderRadius: '10px',
};

export const addUserCancelButton = {
  mb: '10px',
  color: 'black',
  borderColor: '#0063cc',
  '&:hover': {
    color: 'black',
    borderColor: '#262626',
  },
};

export const addUserSubmitButton = {
  mr: '25px',
  mb: '10px',
  backgroundColor: 'black',
  borderColor: '#0063cc',
  '&:hover': {
    color: 'white',
    backgroundColor: 'black',
    borderColor: 'black',
  },
};

export const userManagementTableColumn = [
  {
    label: 'First Name',
    value: 'firstName',
  },
  {
    label: 'Last Name',
    value: 'lastName',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Action',
    value: 'Icon',
  },
];

export const addUserState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isTouched: {},
  error: {},
  isDisabled: true,
};

export const addUserValidationSchema = yup.object({
  firstName: yup.string().label('First Name').required(),
  lastName: yup.string().label('Last Name').required(),
  email: yup.string().email().label('Email Address').required(),
  password: yup.string().label('Password').required(),
});
