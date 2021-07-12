import { storiesOf } from "@storybook/react";
import { Table } from "../table";
import { makeData } from "../__mocks__/table-mock-data";
import { action } from "@storybook/addon-actions";
//import { Dropdown } from "../table-dropdown/dropdown";

const { columns, data } = makeData(20);
storiesOf("1 - Components/Table", module).add("Default", () => {
  return (
    <Table
      columns={columns}
      data={data}
      sortData={action}
      currentSort={{}}
      onCellRangeSelection={action}
    />
  );
});

// storiesOf("1 - Components/Table-2", module).add("Default", () => {
//   return (
//     <Table
//       columns={columns}
//       data={data}
//       sortData={action}
//       currentSort={{}}
//       onCellRangeSelection={action}
//     />
//   );
// });

// storiesOf("1 - Components/Table/DropDown-2", module).add("Default", (args) => {
//   return (
//     <Dropdown
//       menuWidth={args.number}
//       onToggleChange={() => {
//         action("change");
//       }}
//     >
//       <h1>Test Dropdown</h1>
//     </Dropdown>
//   );
// });
