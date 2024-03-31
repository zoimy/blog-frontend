import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shadows: [
    "none",
    "0px 1px 3px 0px rgba(0,0,0,0.1)",
    "0px 1px 5px 0px rgba(0,0,0,0.1)",
    "0px 3px 6px 0px rgba(0,0,0,0.1)",
    "0px 6px 9px -3px rgba(0,0,0,0.1)",
    "0px 12px 17px 2px rgba(0,0,0,0.1)",
    "0px 16px 24px 2px rgba(0,0,0,0.1)",
    "0px 24px 32px 4px rgba(0,0,0,0.1)",
    "0px 32px 48px 6px rgba(0,0,0,0.1)",
  ],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});

export default theme;
