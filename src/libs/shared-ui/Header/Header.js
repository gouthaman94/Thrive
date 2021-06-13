import React from "react";
import { Dropdown } from "../DropDown/dropdownContainer";
import { Filter } from "../Filter/filterContent";
import "./Header.css";

export default function Header(props) {
  const {
    column: { label, id, getHeaderProps },
    sortData,
    currentSort,
    data,
  } = props;

  const filterList = data.map((d) => d[id]);

  return (
    <th {...getHeaderProps()} class="header">
      <div className="header__content">
        <div className="header__text">{label}</div>
        <div
          className={`header__dropdown ${
            currentSort.id === id ? "header__dropdown--selected" : ""
          }`}
        >
          <Dropdown menuWidth={150} toggle={false} onToggleChange={() => {}}>
            <Filter
              sortData={(dir) => {
                sortData(dir, id);
              }}
              isAsc={currentSort.direction === "asc" && currentSort.id === id}
              isDesc={currentSort.direction === "desc" && currentSort.id === id}
              filterList={filterList}
            />
          </Dropdown>
        </div>
      </div>
    </th>
  );
}
