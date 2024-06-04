import { Paper } from "@mui/material";

import { styled } from "@mui/material";

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderColor: theme.palette.primary.dark,
  display: "flex",
  flexDirection: "column",
  padding: "0px 20px 10px",
  marginTop: "30px",
  alignItems: "center",
  width: "80%",

  // maxWidth: "80%",
}));

export default CustomPaper;
