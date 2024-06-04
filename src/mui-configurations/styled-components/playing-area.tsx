import { Box, styled } from "@mui/material";

const CustomPlayingArea = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "20vh",
  width: "50%",
  borderRadius: "50px",
  backgroundColor: theme.palette.primary.light,
}));

export default CustomPlayingArea;
