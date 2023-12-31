import * as yup from 'yup';

export const userManagementSearchBar = {
  left: '10px',
  backgroundColor: '#f2f2f2',
  borderRadius: '5px',
  border: '1px solid #e6e6e6'
};

export const buttonStyles = {
  marginLeft: '20px',
  padding: '5px 15px',
  backgroundColor: 'white',
  color: 'black',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
};

export const addUserCancelButton = {
  mb: '10px',
  color: 'black',
  borderColor: '#0063cc',
  '&:hover': {
    color: 'black',
    backgroundColor: '#f2f2f2',
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
  password: yup.string()
    .required('Password is required')
    .matches(/[a-z]/, 'At least one lowercase character is required')
    .matches(/[A-Z]/, 'At least one uppercase character is required')
    .matches(/[0-9]/, 'At least one number is required')
    .matches(/[^a-zA-Z0-9]/, 'At least one special character is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export const userStatistics = [
  {
    title: 'Total Users',
    count: '4,42,236',
    percentage: 59.3,
    color: 'success',
    extra: '35,000',
  },
  {
    title: 'Active Users',
    count: '78,250',
    percentage: 70.5,
    color: 'success',
    extra: '8,900',
  },
  {
    title: 'Inactive Users',
    count: '18,000',
    percentage: 27.4,
    color: 'warning',
    extra: '1,943',
  },
  {
    title: 'Deleted Users',
    count: '0',
    percentage: 27.4,
    color: 'error',
    extra: '$20,395',
  },
];