import { render } from "@testing-library/react";

import { DashboardGrid } from "./dashboard-grid";

describe("DashboardGrid", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<DashboardGrid />);
    expect(baseElement).toBeTruthy();
  });
});
