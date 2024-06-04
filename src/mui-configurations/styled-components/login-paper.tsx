import { Paper } from "@mui/material";

import { styled } from "@mui/material";

const LoginPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderColor: theme.palette.primary.dark,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  padding: "0px 20px 10px",
  marginTop: "30px",
  alignItems: "center",
  height: "100%",

  width: "30%",
  // maxWidth: "40%",
}));

export default LoginPaper;
