import './App.css';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Landing from './pages/Landing';

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(118, 216, 253, 1)",
      main: "rgba(0, 177, 245, 1)",
      dark: "rgba(0, 144, 221, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(74, 144, 226, 0.67)",
      main: "rgba(74, 144, 226, 1)",
      dark: "rgba(45, 127, 223, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography:{
    fontFamily:"Raleway, sans-serif"
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Landing/>
    </ThemeProvider>
  );
}

export default App;
