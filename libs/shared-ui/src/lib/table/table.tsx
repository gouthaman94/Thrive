/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from "react";
import { useSortBy, useTable } from "react-table";
import { useCellRangeSelection } from "./table-hooks/useCellRangeSelection";
import useScrollOnEdges from "react-scroll-on-edges";
import styles from "./table.module.scss";
import Header from "./table-header/header";

/* eslint-disable-next-line */
export interface TableProps {
  columns: any;
  data: any;
  sortData: any;
  currentSort: any;
  onCellRangeSelection: any;
}

export function Table(props: TableProps) {
  const { columns, data, sortData, currentSort, onCellRangeSelection } = props;

  //@ts-ignore
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    //@ts-ignore
    state: { selectedCells, currentSelectedCells, isSelectingCells },
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
  const cellsSelected: any = { ...currentSelectedCells, ...selectedCells };
  useEffect(() => {
    if (!isSelectingCells) {
      onCellRangeSelection(cellsSelected);
    }
  }, [isSelectingCells]);

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
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td
                      {...cell.getCellRangeSelectionProps({ isCtrl: true })}
                      {...cell.getCellProps()}
                      class="table__cell"
                      {...(cellsSelected?.[cell.id] && {
                        style: {
                          borderTop:
                            cellsSelected[cell.id].isFirstRow &&
                            "1px solid #c5c5c5",
                          borderLeft:
                            cellsSelected[cell.id].isFirstColumn &&
                            "1px solid #c5c5c5",
                          borderRight:
                            cellsSelected[cell.id].isLastColumn &&
                            "1px solid #c5c5c5",
                          borderBottom:
                            cellsSelected[cell.id].isLastRow &&
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
                          <div className="ExcelCursorOuter">
                            <div className="ExcelCursorBottom"></div>
                          </div>
                        )}
                      {cellsSelected[cell.id]?.isFirstRow &&
                        cellsSelected[cell.id]?.isFirstColumn &&
                        !isSelectingCells && (
                          <div className="ExcelCursorOuter">
                            <div className="ExcelCursorTop"></div>
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
