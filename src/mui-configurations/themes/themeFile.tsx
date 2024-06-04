import { createTheme } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";

const customTheme = createTheme({
  palette: {
    primary: {
      main: lime[500],
      light: lime[300],
      dark: lime[700],
    },
    secondary: {
      main: purple[500],
      light: purple[300],
      dark: purple[700],
    },
  },
});

export const theme = createTheme({
  palette: {
    primary: {
      main: lime[500],
      light: lime[300],
      dark: lime[700],
    },
    secondary: {
      main: purple[500],
      light: purple[300],
      dark: purple[700],
    },
    // error: {

    // },
    // success: {

    // }
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "playAgain" },
          style: {
            backgroundColor: customTheme.palette.primary.light,
            fontSize: "1.5rem",
            color: "black",
            "&: hover": {
              backgroundColor: customTheme.palette.primary.dark,
            },
          },
        },
      ],
    },
  },

  typography: {
    endGameModal: {
      fontSize: "3rem",
      color: customTheme.palette.success.light,
      // backgroundColor: customTheme.palette.success.light,
    },

    loginRegister: {
      fontSize: "5rem",
      color: customTheme.palette.primary.main,
    },

    loginRegisterHeader: {
      fontSize: "2rem",
      width: "100%",
      color: customTheme.palette.primary.main,
    },

    gameConfigHeader: {
      fontSize: "2.5rem",
      color: customTheme.palette.success.light,
      fontWeight: "bold",
      // backgroundColor: customTheme.palette.success.light,
    },

    lateralMenuSectionHeader: {
      fontSize: "1.5rem",
      color: customTheme.palette.success.light,
      // backgroundColor: customTheme.palette.success.light,
    },

    gameInfo: {
      fontSize: "1.5rem",
      color: customTheme.palette.success.light,
      // backgroundColor: customTheme.palette.success.light,
    },

    typedCharacterCorrect: {
      fontSize: "3rem",
      color: "black",
      backgroundColor: customTheme.palette.success.light,
      // backgroundColor: "green",
    },

    typedCharacterIncorrect: {
      fontSize: "3rem",
      color: "black",
      backgroundColor: customTheme.palette.error.light,
    },

    currentWord: {
      fontSize: "3rem",
      color: "black",
    },

    totalSuccess: {
      fontSize: "2rem",
      color: customTheme.palette.success.light,
      // backgroundColor: customTheme.palette.secondary.light,
    },
    totalErrors: {
      fontSize: "2rem",
      color: customTheme.palette.error.light,
    },
  },
});
