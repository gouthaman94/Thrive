import { StrictMode } from "react";
import * as ReactDOM from "react-dom";

import "../../../styles/variables.module.scss";

//react grid layout base css
import "react-grid-layout/css/styles.css";

import App from "./app/app";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
);
