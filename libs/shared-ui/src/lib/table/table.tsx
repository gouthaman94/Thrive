/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from "react";
import { useSortBy, useTable } from "react-table";
import { useCellRangeSelection } from "./table-hooks/useCellRangeSelection";
import useScrollOnEdges from "react-scroll-on-edges";
import Styles from "./table.module.scss";
import Header from "./table-header/header";

export interface IColumns {
  label: string;
  accessor: string;
}
/* eslint-disable-next-line */
export interface TableProps {
  columns: IColumns[];
  data: any;
  sortData: any;
  currentSort: any;
  onCellRangeSelection: any;
  barSelected: any;
  mirrorColumns: any;
}

export function Table(props: TableProps) {
  const {
    mirrorColumns,
    barSelected,
    columns,
    data,
    sortData,
    currentSort,
    onCellRangeSelection,
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: {
      //@ts-ignore
      selectedCells,
      //@ts-ignore
      currentSelectedCells,
      //@ts-ignore
      isSelectingCells,
      //@ts-ignore
      mirror: { categoryStartRow, categoryEndRow },
      //@ts-ignore
      currentColumn,
    },
    //@ts-ignore
    toolbarActions,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: {
        Header: Header,
      },
    },
    useCellRangeSelection,
    useSortBy,
  );

  useEffect(() => {
    if (!isSelectingCells) {
      onCellRangeSelection(cellsSelected);
    }
  }, [isSelectingCells]);

  useEffect(() => {
    toolbarActions({ bar: barSelected, mirror: mirrorColumns });
  }, [mirrorColumns, barSelected]);

  const cellsSelected: any = { ...currentSelectedCells, ...selectedCells };

  const isSelecting = (cellId) => {
    const split = "_col_row_";
    const [tableCol, tableRowIndex] = cellId.split(split);
    // eslint-disable-next-line
    const [currCol, _] = (currentColumn || "").split(split);
    return (
      mirrorColumns &&
      tableCol === currCol &&
      +tableRowIndex >= +categoryStartRow &&
      +tableRowIndex <= +categoryEndRow
    );
  };

  const getEdgeScrollingProps = useScrollOnEdges({
    canAnimate: isSelectingCells,
  });

  return (
    <div
      {...getEdgeScrollingProps({
        style: {
          width: "100%",
          height: "400px",
        },
      })}
    >
      <table {...getTableProps()} className={Styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className={Styles.table__row}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) =>
                column.render("Header", { sortData, currentSort }),
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className={Styles.table__row} {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td
                      {...cell.getCellRangeSelectionProps()}
                      {...cell.getCellProps()}
                      className={Styles.table__cell}
                      {...((cellsSelected?.[cell.id] ||
                        isSelecting(cell.id)) && {
                        style: {
                          borderTop:
                            cellsSelected[cell.id]?.isFirstRow &&
                            "1px solid #c5c5c5",
                          borderLeft:
                            cellsSelected[cell.id]?.isFirstColumn &&
                            "1px solid #c5c5c5",
                          borderRight:
                            cellsSelected[cell.id]?.isLastColumn &&
                            "1px solid #c5c5c5",
                          borderBottom:
                            cellsSelected[cell.id]?.isLastRow &&
                            "1px solid #c5c5c5",
                          backgroundColor: "#5c5c5c",
                          color: "#ffffff",
                          userSelect: "none",
                          cursor: "crosshair",
                        },
                      })}
                    >
                      {cellsSelected[cell.id]?.isLastColumn &&
                        cellsSelected[cell.id]?.isLastRow &&
                        !isSelectingCells && (
                          <div className={Styles.excel_cursor__outer}>
                            <div className={Styles.excel_cursor__bottom}></div>
                          </div>
                        )}
                      {cellsSelected[cell.id]?.isFirstRow &&
                        cellsSelected[cell.id]?.isFirstColumn &&
                        !isSelectingCells && (
                          <div className={Styles.excel_cursor__outer}>
                            <div className={Styles.excel_cursor__top}></div>
                          </div>
                        )}
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
