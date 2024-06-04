import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  marginTop: "10px",
  // It is important to notice that the styles for the label are configure here.
  // In this part all the states for the label are configured, that includes
  // hover, error, selected, etc.
  // It is a little bit hard to see that, but once it is understood, it is simple to configure
  "& .MuiInputLabel-root": {
    color: theme.palette.primary.light,
    fontWeight: "bold",
    borderRadius: "10px",
    backgroundColor: theme.palette.secondary.light,
    // backgroundColor: theme.palette.secondary.light,

    // In this part, the error styles are configures
    "&.Mui-error": {
      color: "red",
    },
  },

  "& .MuiInputBase-input": {
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
    fontWeight: "bold",
    borderStyle: "solid",
    borderWidth: "2px",
  },

  "& .Mui-error .MuiInputBase-input ": {
    borderColor: "red",
    color: "red",
  },
}));

export default CustomTextField;
