import { DashboardGrid } from "@thrive/dashboard-grid";
import { SideBar, TopBar } from "@thrive/nav-bar";
import { Tab, Tabs } from "@thrive/shared-ui";
import React from "react";
import styles from "./app.module.scss";
import { TableTab } from "./temp-tab";

export function App() {
  return (
    <div className={styles.app}>
      <TopBar />
      <SideBar />
      <div className={styles.tab_grid}>
        <Tabs>
          <Tab title="New Tab">
            <TableTab />
          </Tab>
          <Tab title="New Tab">
            <DashboardGrid />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
