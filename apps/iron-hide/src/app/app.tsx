import styles from "./app.module.scss";
import { TopBar, SideBar } from "@iron-hide/nav-bar";
import { useCallback } from "react";

//test hook 2
export function App() {
  return (
    <div className={styles.app}>
      <TopBar />
      <SideBar />
    </div>
  );
}

export default App;
