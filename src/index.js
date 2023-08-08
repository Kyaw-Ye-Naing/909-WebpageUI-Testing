import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import ThemeContext from "./features/common/hoc/ThemeContext";
import ThemeProvider from "./features/common/hoc/ThemeProvider";
import  {AppProvider} from './context/AppContext';


ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      {/* <React.StrictMode> */}
        <AppProvider>
          <App />
        </AppProvider>
      {/* </React.StrictMode> */}
    </ThemeProvider>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
