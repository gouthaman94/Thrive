import { storiesOf } from "@storybook/react";
import { Dropdown } from "../dropdown";

storiesOf("1 - Components/Table/DropDown", module).add("Default", (args) => {
  return (
    <Dropdown
      menuWidth={args.number}
      onToggleChange={() => {
        console.log("change");
      }}
    >
      <h1>Test Dropdown</h1>
    </Dropdown>
  );
});
