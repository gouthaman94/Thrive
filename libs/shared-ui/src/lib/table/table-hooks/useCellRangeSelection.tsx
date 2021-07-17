import React from "react";

import { actions, makePropGetter, functionalUpdate } from "react-table";

actions.cellRangeSelectionStart = "cellRangeSelectionStart";
actions.cellRangeSelecting = "cellRangeSelecting";
actions.cellRangeSelectionEnd = "cellRangeSelectionEnd";
actions.cellCurrentColumn = "cellCurrentColumn";
actions.setSelectedCells = "setSelectedCells"; // exposed to user on an instance
actions.setActions = "setActions"; // exposed to user on an instance

export const useCellRangeSelection = (hooks) => {
  hooks.getCellRangeSelectionProps = [defaultgetCellRangeSelectionProps];
  hooks.stateReducers.push(reducer);
  hooks.useInstance.push(useInstance);
  hooks.prepareRow.push(prepareRow);
};

useCellRangeSelection.pluginName = "useCellRangeSelection";

const defaultgetCellRangeSelectionProps = (props, { instance, cell }) => {
  const {
    state: { /*isMirrorSelected,*/ isSelectingCells },
    dispatch,
  } = instance;

  // These actions are not exposed on an instance, as we provide setSelectedCells and getCellsBetweenId.
  const start = (startCell, event) =>
    dispatch({ type: actions.cellRangeSelectionStart, startCell, event });
  const selecting = (selectingEndCell, event) =>
    dispatch({ type: actions.cellRangeSelecting, selectingEndCell, event });
  const end = (endCell, event) =>
    dispatch({ type: actions.cellRangeSelectionEnd, endCell, event });
  const currentColumn = (currentColumn, event) =>
    dispatch({ type: actions.cellCurrentColumn, currentColumn, event });
  return [
    props,
    {
      onMouseDown: (e) => {
        e.persist(); // event-pooling
        start(cell.id, e);
      },
      onMouseUp: (e) => {
        e.persist();
        end(cell.id, e);
      },
      onMouseOver: (e) => {
        currentColumn(cell.id, e);
      },
      onMouseEnter: (e) => {
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
function reducer(state, action, previousState, instance) {
  if (action.type === actions.init) {
    return {
      ...state,
      selectedCells: { ...instance.initialState.selectedCells } || {},
      mirror: {
        categoryStartRow: false,
        categoryEndRow: false,
        firstEndSelection: null,
        firstStartSelection: null,
      },
      isSelectingCells: false,
      startCellSelection: null,
      endCellSelection: null,
      currentSelectedCells: {},
      action: {
        isBarSelected: false,
        isMirrorSelected: false,
      },
      currentColumn: null,
    };
  }

  if (action.type === actions.setActions) {
    return {
      ...state,
      action: {
        ...state.action,
        isBarSelected: action.actionObj["bar"],
        isMirrorSelected: action.actionObj["mirror"],
      },
    };
  }
  if (action.type === actions.cellCurrentColumn) {
    return {
      ...state,
      currentColumn: action.currentColumn,
    };
  }
  if (action.type === actions.cellRangeSelectionStart) {
    const { startCell, event } = action;
    const {
      state: {
        startCellSelection,
        mirror: { categoryStartRow, categoryEndRow },
        action: { isBarSelected, isMirrorSelected },
      },
      getCellsBetweenId,
    } = instance;

    let newState = Object.assign(state.selectedCells, {});
    if (event.ctrlKey === true) {
      if (newState[startCell]) {
        delete newState[startCell];
      } else {
        newState[startCell] = true;
      }
    } else if (isMirrorSelected) {
      const split = "_col_row_";
      const [curCol] = startCell.split(split);
      newState = {
        ...newState,
        ...getCellsBetweenId(
          curCol + split + categoryStartRow,
          curCol + split + categoryEndRow,
        ),
      };
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
      mirror: {
        ...state.mirror,
        categoryStartRow:
          isBarSelected && !isMirrorSelected
            ? startCell.split("_col_row_")[1]
            : state.mirror.categoryStartRow,
      },
      startCellSelection: event.shiftKey
        ? startCellSelection || startCell
        : startCell,
    };
  }

  if (action.type === actions.cellRangeSelecting) {
    const { selectingEndCell } = action;
    const {
      state: {
        startCellSelection,
        mirror: {
          categoryStartRow,
          categoryEndRow,
          // firstStartSelection,
          // firstEndSelection,
        },
        selectedCells,
        action: { isBarSelected, isMirrorSelected },
      },
      getCellsBetweenId,
    } = instance;

    let newState;
    const split = "_col_row_";
    const [, cEndIndex] = selectingEndCell.split(split);
    const selectingStart =
      +cEndIndex + 1 == categoryStartRow || +cEndIndex - 1 == categoryStartRow;
    const selectingEnd =
      +cEndIndex + 1 == categoryEndRow || +cEndIndex - 1 == categoryEndRow;

    // let start = cEndIndex < categoryEndRow ?  cEndIndex : categoryStartRow;
    // let end = cEndIndex < categoryEndRow ?  categoryEndRow : cEndIndex;

    const start = selectingStart ? cEndIndex : categoryStartRow;
    const end = selectingEnd ? cEndIndex : categoryEndRow;

    if (!isMirrorSelected) {
      // Get cells between cell ids (range)
      newState = getCellsBetweenId(startCellSelection, selectingEndCell);
    } else {
      let selected = {};
      const selectedColumns = Object.keys(selectedCells).reduce((x, y) => {
        const [col] = y.split(split);
        x[col] = true;
        return x;
      }, {});
      Object.keys(selectedColumns).map((cell) => {
        const [col] = cell.split(split);
        selected = {
          ...selected,
          ...getCellsBetweenId(col + split + start, col + split + end),
        };
      });
      newState = selected;
    }

    return {
      ...state,
      ...(isMirrorSelected && { selectedCells: { ...newState } }),
      mirror: {
        ...state.mirror,
        categoryStartRow:
          isBarSelected && isMirrorSelected
            ? start
            : state.mirror.categoryStartRow,
        categoryEndRow:
          isBarSelected && isMirrorSelected ? end : state.mirror.categoryEndRow,
        firstStartSelection: selectingStart,
        firstEndSelection: selectingEnd,
      },
      endCellSelection: selectingEndCell,
      currentSelectedCells: newState,
    };
  }

  if (action.type === actions.cellRangeSelectionEnd) {
    const { endCell, event } = action;
    const {
      state: {
        startCellSelection,
        selectedCells,
        action: { isBarSelected, isMirrorSelected },
      },
      getCellsBetweenId,
    } = instance;

    let {
      state: { currentSelectedCells },
    } = instance;

    if (event.shiftKey) {
      currentSelectedCells = getCellsBetweenId(startCellSelection, endCell);
    }

    return {
      ...state,
      selectedCells: { ...selectedCells, ...currentSelectedCells },
      isSelectingCells: false,
      mirror: {
        ...state.mirror,
        firstStartSelection: null,
        firstEndSelection: null,
        categoryEndRow:
          isBarSelected && !isMirrorSelected
            ? endCell.split("_col_row_")[1]
            : state.mirror.categoryEndRow,
      },
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

function useInstance(instance) {
  const { dispatch, allColumns, rows } = instance;

  const cellsById = {};
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

  const toolbarActions = React.useCallback(
    (actionObj) => {
      return dispatch({
        type: actions.setActions,
        actionObj,
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
      const columnsIndex: any[] = [];
      allColumns.forEach((col, index) => {
        if (
          col.id === cellsById[startCell].column.id ||
          col.id === cellsById[endCell].column.id
        ) {
          columnsIndex.push(index);
        }
      });

      // all selected rows and selected columns
      const selectedColumns: any[] = [];
      const selectedRows: any[] = [];
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
      const cellsBetween = {};
      if (selectedRows.length && selectedColumns.length) {
        for (let i = 0; i < selectedRows.length; i++) {
          for (let j = 0; j < selectedColumns.length; j++) {
            const id = selectedColumns[j] + cellIdSplitBy + selectedRows[i];
            const cell = cellsById[id];
            cellsBetween[cell.id] = {
              value: cell.value,
              isFirstColumn: j === 0,
              isLastColumn: j === selectedColumns.length - 1,
              isFirstRow: i === 0,
              isLastRow: i === selectedRows.length - 1,
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
    toolbarActions,
  });
}

function prepareRow(row, { instance: { cellsById, cellIdSplitBy }, instance }) {
  row.allCells.forEach((cell) => {
    cell.id = cell.column.id + cellIdSplitBy + row.id;
    cellsById[cell.id] = cell;
    cell.getCellRangeSelectionProps = makePropGetter(
      instance.getHooks().getCellRangeSelectionProps,
      { instance: instance, row, cell },
    );
  });
}
