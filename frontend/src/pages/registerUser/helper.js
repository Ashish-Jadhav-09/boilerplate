import * as yup from "yup";

export const registerUserValidationSchema = yup.object({
  firstName: yup.string().label("First Name").required(),
  lastName: yup.string().label("Last Name").required(),
  email: yup.string().email().label("Email Address").required(),
  password: yup.string()
    .required('Password is required')
    .matches(/[a-z]/, 'At least one lowercase character is required')
    .matches(/[A-Z]/, 'At least one uppercase character is required')
    .matches(/[0-9]/, 'At least one number is required')
    .matches(/[^a-zA-Z0-9]/, 'At least one special character is required')
    .min(6, 'Password must be at least 6 characters long'),
});
