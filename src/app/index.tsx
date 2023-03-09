import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import RootLayout from "app/layouts/rootLayout";
import GolobalStyles from "styles/GlobalStyles";

export function App() {
  return (
    <BrowserRouter basename="/">
      <Helmet defaultTitle="Revise">
        <title>Revise - Dashboard</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <GolobalStyles>
        <RootLayout />
      </GolobalStyles>
    </BrowserRouter>
  );
}
