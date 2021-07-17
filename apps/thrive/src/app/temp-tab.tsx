/** temp tab before abstraction*/

import { Charts, Table } from "@thrive/shared-ui";
import { useState } from "react";
import { makeData } from "./__mocks__/table-mock-data";

import Styles from "./temp-tab.module.scss";

const { columns, data } = makeData(20);

export function TableTab() {
  const [tableData, setTableData] = useState({ data, currentSort: {} });
  const [chartData, setchartData] = useState<any>({ data, currentSort: {} });
  const [chartAxis, setChartAxis] = useState<any[]>([]);
  const [barSelected, setBarSelected] = useState(false);
  const [mirrorColumns, setMirrorColumns] = useState(false);

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

  const handleCellRangeSelection = (selectedCells: any) => {
    const cols = {};
    const result: any = Object.keys(selectedCells).reduce((x, y) => {
      const [col, i] = y.split("_col_row_");
      cols[col] = selectedCells[y].isFirstColumn;
      x[i] = {
        ...x[i],
        [col]: selectedCells[y].value,
      };
      return x;
    }, {});
    const arr = Object.keys(result).reduce((x: any[], y) => {
      x.push({ ...result[y] });
      return x;
    }, []);
    const c = [
      ...Object.keys(cols).filter((k) => cols[k]),
      ...Object.keys(cols).filter((k) => !cols[k]),
    ];
    setChartAxis(c);
    setchartData(arr);
  };

  const handleBarChart = () => {
    setBarSelected(!barSelected);
  };

  const addMirrorColumns = () => {
    setMirrorColumns(!mirrorColumns);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles["cards"]}>
        <div className={Styles["cards__item"]}>
          <div className={Styles["card"]}>
            <div className={Styles["card__title"]}>Bar Chart</div>
            <div className={Styles["card__content"]}>
              <div>
                <Charts data={chartData} columns={chartAxis} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles["row"]}>
        <div className={Styles["row__item"]}>
          <div className={Styles["row__element"]}>
            <button
              className={`${Styles.row__btn} ${Styles["row--b1"]} ${Styles["row--big"]}`}
            >
              <i className="fa fa-file-import"></i>
              <span className={Styles["row__text"]}>Document Name</span>
            </button>
            <div className={Styles["row__text"]}>:</div>
            <button
              className={`${Styles.row__btn} ${Styles["row--b1"]} ${Styles["row--big"]}`}
            >
              <span className={Styles["row__text"]}>Sheet/Chapter Name</span>
            </button>
          </div>
          <div
            className={`${Styles["row__element"]} ${Styles["row__element--center"]}`}
          >
            <div
              className={`${Styles.row__text} ${Styles[" row__text--title"]}`}
            >
              CHART TITLE
            </div>
          </div>
          <div
            className={`${Styles["row__element"]} ${Styles["row__element--end"]}`}
          >
            <div className={Styles.row__search}>
              <input
                className={Styles.row__input}
                type="text"
                placeholder="Search..."
              />
              <span>
                <i
                  className={`${Styles.row__input__menu} fa fa-ellipsis-v`}
                ></i>
              </span>
              <span>
                <i className={`${Styles.row__input__search} fa fa-search`} />
              </span>
            </div>
          </div>
        </div>
        <div className={`${Styles.row__item} ${Styles["row--divider"]}`}>
          <div className={Styles.row__element}>
            <div className={Styles.row__text}>Chart Type :</div>
          </div>
          <div className={Styles.row__element}>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-chart-pie"></i>
            </button>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-chart-line"></i>
            </button>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-chart-bar"></i>
            </button>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-chart-area"></i>
            </button>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-project-diagram"></i>
            </button>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-circle-notch"></i>
            </button>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-sliders-h"></i>
            </button>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-chart-pie"></i>
            </button>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-ellipsis-h"></i>
            </button>
          </div>
          <div className={Styles["row__divider-v"]} />
          <div className={Styles.row__element}>
            <div className={Styles.row__text}>Categories:</div>
          </div>
          <div className={Styles.row__element}>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${
                Styles["row__btn--icon"]
              } ${barSelected && Styles["row__btn--highlight"]}`}
              onClick={handleBarChart}
            >
              <i className="fa fa-table"></i>
            </button>
          </div>
          <div className={Styles.row__element}>
            <div className={Styles.row__text}>Series:</div>
          </div>
          <div className={Styles.row__element}>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${
                Styles["row__btn--icon"]
              } ${mirrorColumns && Styles["row__btn--highlight"]}`}
              onClick={addMirrorColumns}
            >
              <i className="fa fa-table"></i>
            </button>
          </div>
          <div className={Styles.row__element}>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>
          <div className={Styles["row__divider-v"]} />
          <div className={Styles.row__element}>
            <div className={Styles.row__text}>Legent:</div>
          </div>
          <div className={Styles.row__element}>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>
          <div className={Styles["row__divider-v"]} />
          <div className={Styles.row__element}>
            <div className={Styles.row__text}>Settings:</div>
          </div>
          <div className={Styles.row__element}>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-text-height"></i>
            </button>
          </div>
          <div className={Styles.row__element}>
            <button
              className={`${Styles.row__btn} ${Styles["row__btn--m2"]} ${Styles["row__btn--icon"]}`}
            >
              <i className="fa fa-gear"></i>
            </button>
          </div>
          <div className={Styles["row__divider-v"]} />
          <div
            className={`${Styles.row__element} ${Styles["row__element--end"]} ${Styles["row--flex"]}`}
          >
            <button
              className={`${Styles.row__btn} ${Styles["row--b1"]} ${Styles["row--big"]}`}
            >
              <i className="fa fa-arrow-circle-left"></i>
              <span className={Styles.row__text}>Cancel</span>
            </button>
            <button
              className={`${Styles.row__btn} ${Styles["row--b1"]} ${Styles["row--big"]}`}
            >
              <i className="fa fa-check-circle"></i>
              <span className="row__text">Create</span>
            </button>
          </div>
        </div>
        <div className="row__item">
          <Table
            barSelected={barSelected}
            mirrorColumns={mirrorColumns}
            columns={columns}
            data={tableData.data}
            sortData={sortData}
            currentSort={tableData.currentSort}
            onCellRangeSelection={handleCellRangeSelection}
          />
        </div>
      </div>
    </div>
  );
}
