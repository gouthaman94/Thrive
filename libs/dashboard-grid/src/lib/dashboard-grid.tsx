import styles from "./dashboard-grid.module.scss";
import { WidthProvider, Responsive } from "react-grid-layout";
import { useState } from "react";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLocalStorage("layouts") || {};

function getFromLocalStorage(key: string) {
  const ls = JSON.parse(localStorage.getItem("IronHideDashboard") ?? "{}");
  return ls && ls[key];
}

function saveToLS(key: string, value: any) {
  if (localStorage) {
    localStorage.setItem(
      "IronHideDashboard",
      JSON.stringify({
        [key]: value,
      }),
    );
  }
}

/* eslint-disable-next-line */
export interface DashboardGridProps {}

export function DashboardGrid(props: DashboardGridProps) {
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts)),
  );

  //const [currentBreakPoint, setCurrentBreakPoint] = useState("md");

  const resetLayout = () => {
    setLayouts({ layouts: {} });
  };

  const onLayoutChange = (layout: any, layouts: any) => {
    saveToLS("layouts", layouts);
    setLayouts({ ...layouts });
  };

  // const createDashboardItem =()=>{

  // }

  return (
    <div className={styles.dashboard__container}>
      <ResponsiveReactGridLayout
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        // onBreakpointChange={(newBreakpoint) =>
        //   setCurrentBreakPoint(newBreakpoint)
        // }
      >
        <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
          <div className={styles.dashboard__grid_item}>1</div>
        </div>
        <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
          <div className={styles.dashboard__grid_item}>2</div>
        </div>
        <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}>
          <div className={styles.dashboard__grid_item}>3</div>
        </div>
        <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>
          <div className={styles.dashboard__grid_item}>4</div>
        </div>
        <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}>
          <div className={styles.dashboard__grid_item}>5</div>
        </div>
      </ResponsiveReactGridLayout>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={() => resetLayout()}>
          Reset Layout
        </button>
        <button className={styles.button} onClick={() => resetLayout()}>
          Add
        </button>
      </div>
    </div>
  );
}
