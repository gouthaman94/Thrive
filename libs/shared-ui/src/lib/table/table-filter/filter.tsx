import Styles from "./filter.module.scss";
import { SortAsc, SortDesc } from "@iron-hide/assets";

export const Filter = (props: any) => {
  const { sortData, isAsc, isDesc, filterList } = props;
  return (
    <div className={Styles.wrapper}>
      <div className={Styles["form-row"]}>
        <label className={Styles["form-label"]}>Sort:</label>
        <div
          className={`${Styles.sort_icon} ${
            isDesc ? Styles["sort_icon--selected"] : ""
          }`}
        >
          <SortDesc onClick={() => sortData("desc")} />
        </div>
        <div
          className={`${Styles.sort_icon} ${
            isAsc ? Styles["sort_icon--selected"] : ""
          }`}
        >
          <SortAsc onClick={() => sortData("asc")} />
        </div>
      </div>
      <div className={Styles.divider} />
      <div className={Styles["form-row"]}>
        <label className={Styles["form-label"]}>Filter:</label>
        <input
          className={Styles["form-input"]}
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className={Styles["form-list"]}>
        <div className={`${Styles["items-center"]} ${Styles.mb2}`}>
          <input
            className={Styles["mr2"]}
            type="checkbox"
            id="spacejam"
            value="spacejam"
          />
          <label htmlFor="spacejam" className="lh-copy">
            ALL
          </label>
        </div>
        <div className={Styles["divider"]} />
        <div className={Styles["filter_items"]}>
          {filterList.map((itemName: any) => {
            return (
              <div className={`${Styles["items-center"]} ${Styles.mb2}`}>
                <input
                  className={Styles["mr2"]}
                  type="checkbox"
                  id="airbud"
                  value="airbud"
                />
                <label htmlFor="airbud" className="lh-copy">
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
