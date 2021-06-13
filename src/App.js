import React from "react";
import makeData from "./makeData";
import { Table } from "./libs/shared-ui/Table/Table";
import { Charts } from "./SampleChart";
import "./App.css";
import "./index.css";

const { columns, data } = makeData(20);

export const App = () => {
  const [tableData, setTableData] = React.useState({ data, currentSort: {} });

  const sortData = (direction, id) => {
    const data = tableData.data.sort((i1, i2) => {
      if (i1[id] < i2[id]) {
        return direction === "desc" ? 1 : -1;
      } else {
        return direction === "desc" ? -1 : 1;
      }
    });
    setTableData({ data: [...data], currentSort: { id, direction } });
  };

  return (
    <div class="container">
      <div class="item">
        <Charts />
      </div>
      <div class="item">
        <Table
          columns={columns}
          data={tableData.data}
          sortData={sortData}
          currentSort={tableData.currentSort}
        />
      </div>
    </div>
  );
};
