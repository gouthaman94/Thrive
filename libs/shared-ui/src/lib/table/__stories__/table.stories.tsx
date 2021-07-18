import { storiesOf } from "@storybook/react";
import { Table } from "../table";
import { makeData } from "../__mocks__/table-mock-data";
import { action } from "@storybook/addon-actions";

const { columns, data } = makeData(20);
storiesOf("1 - Components/Table", module).add("Default", () => {
  return (
    <Table
      columns={columns}
      data={data}
      sortData={action("sort")}
      currentSort={{}}
      onCellRangeSelection={action}
      mirrorColumns={{}}
      barSelected={{}}
    />
  );
});
