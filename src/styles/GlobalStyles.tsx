import "./GlobalStyles.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

interface Props {
  children: JSX.Element;
}

const GlobalStyles = ({ children }: Props) => {
  return children;
};

export default GlobalStyles;
