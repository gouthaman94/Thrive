import { StrictMode } from "react";
import * as ReactDOM from "react-dom";

//react grid layout base css
import "react-grid-layout/css/styles.css";

import App from "./app/app";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
);
