import React from "react";
import { useTable, useSortBy } from "react-table";
import { useCellRangeSelection } from "react-table-plugins";
import useScrollOnEdges from "react-scroll-on-edges";
import Header from "../Header/Header";
import "./Table.css";

export const Table = (props) => {
  const { columns, data, sortData, currentSort } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedCellIds, currentSelectedCellIds, isSelectingCells },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: {
        Header: Header,
      },
    },
    useCellRangeSelection,
    useSortBy
  );

  let cellsSelected = { ...currentSelectedCellIds, ...selectedCellIds };

  const getEdgeScrollingProps = useScrollOnEdges({
    canAnimate: isSelectingCells,
  });

  return (
    <>
      <div
        {...getEdgeScrollingProps({
          style: {
            height: "400px",
          },
        })}
      >
        <table {...getTableProps()} class="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) =>
                  column.render("Header", { sortData, currentSort })
                )}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellRangeSelectionProps()}
                        {...cell.getCellProps()}
                        class="table__cell"
                        style={
                          cellsSelected[cell.id] && {
                            backgroundColor: "#999999",
                            color: "black",
                            userSelect: "none",
                          }
                        }
                      >
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
      <div>
        <pre>
          <code>
            {JSON.stringify(
              { selectedCellIds, currentSelectedCellIds },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    </>
  );
};
