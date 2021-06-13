import React from "react";
import "./filterContent.css";
import { ReactComponent as SortAsc } from "../../../svgs/sortAsc.svg";
import { ReactComponent as SortDesc } from "../../../svgs/sortDesc.svg";

export const Filter = (props) => {
  const { sortData, isAsc, isDesc, filterList } = props;
  return (
    <div className="wrapper">
      <div className="form-row">
        <label className="form-label">Sort:</label>
        <div className={`sort_icon ${isDesc ? "sort_icon--selected" : ""}`}>
          <SortDesc onClick={() => sortData("desc")} />
        </div>
        <div className={`sort_icon ${isAsc ? "sort_icon--selected" : ""}`}>
          <SortAsc onClick={() => sortData("asc")} />
        </div>
      </div>
      <div className="divider" />
      <div className="form-row">
        <label className="form-label">Filter:</label>
        <input className="form-input" type="text" placeholder="Search..." />
      </div>
      <div className="form-list">
        <div className="items-center mb2">
          <input
            className="mr2"
            type="checkbox"
            id="spacejam"
            value="spacejam"
          />
          <label for="spacejam" className="lh-copy">
            ALL
          </label>
        </div>
        <div className="divider" />
        <div className="filter_items">
          {filterList.map((itemName) => {
            return (
              <div className="items-center mb2">
                <input
                  className="mr2"
                  type="checkbox"
                  id="airbud"
                  value="airbud"
                />
                <label for="airbud" className="lh-copy">
                  {itemName}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
