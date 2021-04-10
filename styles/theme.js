import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7C51FF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#7C51FF",
      contrastText: "#fff",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily:
      "FibraOne-Bold, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
  },
});

export default theme;
