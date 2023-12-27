import * as yup from "yup";

export const loginUserValidationSchema = yup.object({
  email: yup.string().email().label("Email Address").required(),
  password: yup.string().required("Password is required"),
});

export const loginMainGrid = {
  height: "100vh",
  backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) =>
    t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const loginBox = {
  my: 8,
  mx: 4,
  mt: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(8px)",
  padding: 5,
  borderRadius: 3,
};
