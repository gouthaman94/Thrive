import { addDecorator, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

addDecorator(withKnobs);

addParameters({
  options: {
    showPanel: true,
    panelPosition: "bottom",
  },
});
