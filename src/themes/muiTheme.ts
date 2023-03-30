import { createTheme } from "@mui/material/styles";

import palette from "styles/palette.scss";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {},
    },
  },
});

export default muiTheme;
