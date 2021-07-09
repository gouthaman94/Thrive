import { storiesOf } from "@storybook/react";
import { Dropdown } from "../dropdown";

storiesOf("1 - Components/Table/DropDown", module).add("Default", () => {
  return (
    <Dropdown
      menuWidth={150}
      onToggleChange={() => {
        console.log("change");
      }}
    >
      <h1>Test Dropdown</h1>
    </Dropdown>
  );
});
