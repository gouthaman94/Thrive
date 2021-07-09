import styles from "./app.module.scss";
import { TopBar, SideBar } from "@iron-hide/nav-bar";
import { Tab, Tabs, Table } from "@iron-hide/shared-ui";
import { DashboardGrid } from "@iron-hide/dashboard-grid";
import React from "react";
import { makeData } from "./__mocks__/table-mock-data";

const { columns, data } = makeData(20);

export function App() {
  const [tableData, setTableData] = React.useState({ data, currentSort: {} });
  /*eslint-disable */
  const [chartData, setchartData] = React.useState({ data, currentSort: {} });
  const [chartAxis, setChartAxis] = React.useState([]);

  const sortData = (direction: string, id: any) => {
    const data = tableData.data.sort((i1: any, i2: any) => {
      if (i1[id] < i2[id]) {
        return direction === "desc" ? 1 : -1;
      } else {
        return direction === "desc" ? -1 : 1;
      }
    });
    setTableData({ data: [...data], currentSort: { id, direction } });
  };

  const handleCellRangeSelection = (selectedCells: any) => {
    const cols: any = {};
    const result: any = Object.keys(selectedCells).reduce((x: any, y: any) => {
      const [col, i] = y.split("_col_row_");
      cols[col] = selectedCells[y].isFirstColumn;
      x[i] = {
        ...x[i],
        [col]: selectedCells[y].value,
      };
      return x;
    }, {});
    const arr = Object.keys(result).reduce((x: any, y: any) => {
      x.push({ ...result[y] });
      return x;
    }, []);
    const c: any = [
      ...Object.keys(cols).filter((k) => cols[k]),
      ...Object.keys(cols).filter((k) => !cols[k]),
    ];
    setChartAxis(c);
    setchartData(arr);
  };

  return (
    <div className={styles.app}>
      <TopBar />
      <SideBar />
      <div className={styles.tab_grid}>
        <Tabs>
          <Tab title="New Tab">
            <DashboardGrid />
          </Tab>
          <Tab title="New Tab 2">
            <Table
              columns={columns}
              data={tableData.data}
              sortData={sortData}
              currentSort={tableData.currentSort}
              onCellRangeSelection={handleCellRangeSelection}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
