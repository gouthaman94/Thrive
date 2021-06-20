import styles from "./app.module.scss";
import { TopBar, SideBar } from "@iron-hide/nav-bar";

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
