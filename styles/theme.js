import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#62d76b",
      contrastText: "#fff",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
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
