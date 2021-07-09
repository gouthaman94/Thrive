import { Dropdown } from "../table-dropdown/dropdown";
import { Filter } from "../table-filter/filter";
import Styles from "./header.module.scss";

export default function Header(props: any) {
  const {
    column: { label, id, getHeaderProps },
    sortData,
    currentSort,
    data,
  } = props;

  const filterList = data.map((d: any) => d[id]);

  return (
    <th {...getHeaderProps()} className={Styles.header}>
      <div className={Styles.header__content}>
        <div className={Styles.header__text}>{label}</div>
        <div
          className={`${Styles.header__dropdown} ${
            currentSort.id === id ? Styles["header__dropdown--selected"] : ""
          }`}
        >
          <Dropdown menuWidth={150}>
            <Filter
              sortData={(dir: string) => {
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
