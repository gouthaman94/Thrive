import styles from "./app.module.scss";
import { TopBar, SideBar } from "@iron-hide/nav-bar";
import { Tab, Tabs } from "@iron-hide/shared-ui";
import { DashboardGrid } from "@iron-hide/dashboard-grid";

export function App() {
  return (
    <div className={styles.app}>
      <TopBar />
      <SideBar />
      <div className={styles.tab_grid}>
        <Tabs>
          <Tab title="New Tab">
            <DashboardGrid />
          </Tab>
          <Tab title="New Tab 2">Test tabs</Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
