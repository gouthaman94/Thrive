import { storiesOf } from "@storybook/react";
import { Dropdown } from "../dropdown";
import { number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

storiesOf("1 - Components/Table/DropDown", module).add("Default", (args) => {
  return (
    <Dropdown
      menuWidth={number("Width", args.number)}
      onToggleChange={action("toggle change")}
    >
      <h1>Test Dropdown</h1>
    </Dropdown>
  );
});
