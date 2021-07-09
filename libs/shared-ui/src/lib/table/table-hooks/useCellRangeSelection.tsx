import React from "react";

import { actions, makePropGetter, functionalUpdate } from "react-table";

actions.cellRangeSelectionStart = "cellRangeSelectionStart";
actions.cellRangeSelecting = "cellRangeSelecting";
actions.cellRangeSelectionEnd = "cellRangeSelectionEnd";
actions.setSelectedCells = "setSelectedCells"; // exposed to user on an instance

export const useCellRangeSelection = (hooks: any) => {
  hooks.getCellRangeSelectionProps = [defaultgetCellRangeSelectionProps];
  hooks.stateReducers.push(reducer);
  hooks.useInstance.push(useInstance);
  hooks.prepareRow.push(prepareRow);
};

useCellRangeSelection.pluginName = "useCellRangeSelection";

const defaultgetCellRangeSelectionProps = (
  props: any,
  { instance, cell }: any,
) => {
  const {
    state: { isSelectingCells },
    dispatch,
  } = instance;

  // These actions are not exposed on an instance, as we provide setSelectedCells and getCellsBetweenId.
  const start = (startCell: any, event: any) =>
    dispatch({ type: actions.cellRangeSelectionStart, startCell, event });
  const selecting = (selectingEndCell: any, event: any) =>
    dispatch({ type: actions.cellRangeSelecting, selectingEndCell, event });
  const end = (endCell: any, event: any) =>
    dispatch({ type: actions.cellRangeSelectionEnd, endCell, event });

  return [
    props,
    {
      onMouseDown: (e: React.MouseEvent) => {
        e.persist(); // event-pooling
        start(cell.id, e);
      },
      onMouseUp: (e: React.MouseEvent) => {
        e.persist();
        end(cell.id, e);
      },
      onMouseEnter: (e: React.MouseEvent) => {
        if (isSelectingCells) {
          e.persist();
          selecting(cell.id, e);
        }
      },
    },
  ];
};

// currentSelectedCells: Is for currently selected range
// selectedCells: Contains all selected cells
// On cellRangeSelectionEnd: we move currentSelectedCells to selectedCells
function reducer(state: any, action: any, previousState: any, instance: any) {
  if (action.type === actions.init) {
    return {
      ...state,
      selectedCells: { ...instance.initialState.selectedCells } || {},
      isSelectingCells: false,
      startCellSelection: null,
      endCellSelection: null,
      currentSelectedCells: {},
    };
  }

  if (action.type === actions.cellRangeSelectionStart) {
    const { startCell, event } = action;
    const {
      state: { startCellSelection },
      getCellsBetweenId,
    } = instance;

    let newState = Object.assign(state.selectedCells, {});
    if (event.ctrlKey === true) {
      if (newState[startCell]) {
        delete newState[startCell];
      } else {
        newState[startCell] = true;
      }
    } else {
      //Single row selection
      const gh = getCellsBetweenId(startCell, startCell);
      newState = {
        [startCell]: gh[startCell],
      };
    }

    return {
      ...state,
      selectedCells:
        {
          ...newState,
        } || {},
      isSelectingCells: true,
      startCellSelection: event.shiftKey
        ? startCellSelection || startCell
        : startCell,
    };
  }

  if (action.type === actions.cellRangeSelecting) {
    const { selectingEndCell } = action;
    const {
      state: { startCellSelection },
      getCellsBetweenId,
    } = instance;

    // Get cells between cell ids (range)
    const newState = getCellsBetweenId(startCellSelection, selectingEndCell);

    return {
      ...state,
      endCellSelection: selectingEndCell,
      currentSelectedCells: newState,
    };
  }

  if (action.type === actions.cellRangeSelectionEnd) {
    const { endCell, event } = action;
    let {
      // eslint-disable-next-line prefer-const
      state: { startCellSelection, selectedCells, currentSelectedCells },
      // eslint-disable-next-line prefer-const
      getCellsBetweenId,
    } = instance;

    if (event.shiftKey) {
      currentSelectedCells = getCellsBetweenId(startCellSelection, endCell);
    }

    return {
      ...state,
      selectedCells: { ...selectedCells, ...currentSelectedCells },
      isSelectingCells: false,
      currentSelectedCells: {},
      // commented we need to retain startCellSelection on shift selection.
      // startCellSelection: event.shiftKey ? startCellSelection : null,
      endCellSelection: null,
    };
  }

  if (action.type === actions.setSelectedCells) {
    const selectedCells = functionalUpdate(
      action.selectedCells,
      state.selectedCells,
    );

    return {
      ...state,
      selectedCells: selectedCells,
    };
  }
}

function useInstance(instance: any) {
  const { dispatch, allColumns, rows } = instance;

  const cellsById: any = {};
  // make user control the cellIdSplitter
  const defaultCellIdSplitBy = "_col_row_";
  const cellIdSplitBy = instance.cellIdSplitBy || defaultCellIdSplitBy;
  Object.assign(instance, { cellIdSplitBy });

  const setSelectedCells = React.useCallback(
    (selectedCells) => {
      return dispatch({
        type: actions.setSelectedCells,
        selectedCells,
      });
    },
    [dispatch],
  );

  // Returns all cells between Range ( between startcell and endcell Ids)
  const getCellsBetweenId = React.useCallback(
    (startCell, endCell) => {
      if (!cellsById[startCell] || !cellsById[endCell]) {
        throw new Error(
          `React Table: startCellId and endCellId has to be valid cell Id`,
        );
      }

      // get rows and columns index boundaries
      const rowsIndex = [
        cellsById[startCell].row.index,
        cellsById[endCell].row.index,
      ];
      const columnsIndex: Array<any> = [];
      allColumns.forEach((col: any, index: number) => {
        if (
          col.id === cellsById[startCell].column.id ||
          col.id === cellsById[endCell].column.id
        ) {
          columnsIndex.push(index);
        }
      });

      // all selected rows and selected columns
      const selectedColumns = [];
      const selectedRows = [];
      for (
        let i = Math.min(...columnsIndex);
        i <= Math.max(...columnsIndex);
        i++
      ) {
        selectedColumns.push(allColumns[i].id);
      }
      for (let i = Math.min(...rowsIndex); i <= Math.max(...rowsIndex); i++) {
        selectedRows.push(rows[i].id);
      }

      // select cells
      const cellsBetween: any = {};
      if (selectedRows.length && selectedColumns.length) {
        for (let i = 0; i < selectedRows.length; i++) {
          for (let j = 0; j < selectedColumns.length; j++) {
            const id = selectedColumns[j] + cellIdSplitBy + selectedRows[i];
            const cell = cellsById[id];
            cellsBetween[cell.id] = {
              value: cell.value,
              isFirstColumn: j == 0,
              isLastColumn: j == selectedColumns.length - 1,
              isFirstRow: i == 0,
              isLastRow: i == selectedRows.length - 1,
            };
          }
        }
      }

      return cellsBetween;
    },
    [allColumns, cellsById, cellIdSplitBy, rows],
  );

  Object.assign(instance, {
    getCellsBetweenId,
    cellsById,
    setSelectedCells,
  });
}

function prepareRow(
  row: any,
  { instance: { cellsById, cellIdSplitBy }, instance }: any,
) {
  row.allCells.forEach((cell: any) => {
    cell.id = cell.column.id + cellIdSplitBy + row.id;
    cellsById[cell.id] = cell;
    cell.getCellRangeSelectionProps = makePropGetter(
      instance.getHooks().getCellRangeSelectionProps,
      { instance: instance, row, cell },
    );
  });
}
