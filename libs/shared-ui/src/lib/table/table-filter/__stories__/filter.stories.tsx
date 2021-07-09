import { storiesOf } from "@storybook/react";
import { Filter } from "../filter";

storiesOf("1 - Components/Table/Filter", module).add("Default", () => {
  return (
    <Filter
      sortData={(dir: string) => {
        console.log(dir);
      }}
      isAsc={true}
      isDesc={false}
      filterList={["item1", "item2"]}
    />
  );
});
