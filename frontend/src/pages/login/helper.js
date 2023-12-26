import * as yup from "yup";

export const loginUserValidationSchema = yup.object({
  email: yup.string().email().label("Email Address").required(),
  password: yup.string().required("Password is required"),
});
