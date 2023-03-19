import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#00ab55",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {},
    },
  },
});

export default muiTheme;
