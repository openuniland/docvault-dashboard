import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { QueryClient, QueryClientProvider } from "react-query";

import RootLayout from "app/layouts/rootLayout";
import GolobalStyles from "styles/GlobalStyles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import configs from "configs";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import muiTheme from "themes/muiTheme";

const queryClient = new QueryClient();
const clientId = configs.google.clientId;

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <Helmet defaultTitle="Revise">
          <title>Revise - Dashboard</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <ThemeProvider theme={muiTheme}>
          <StyledEngineProvider injectFirst>
            <GolobalStyles>
              <GoogleOAuthProvider clientId={clientId}>
                <RootLayout />
              </GoogleOAuthProvider>
            </GolobalStyles>
          </StyledEngineProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
