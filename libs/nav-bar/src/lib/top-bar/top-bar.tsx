import Styles from "./top-bar.module.scss";
import logo from "./__assets__/thrive-logo.png";

/* eslint-disable-next-line */
export interface ITopBarProps {}

export function TopBar(props: ITopBarProps) {
  return (
    <div className={Styles.top_bar}>
      <div className={Styles.top_bar__left_items}>
        <img src={logo} alt={"...Loading"} className={Styles.logo} />
      </div>
    </div>
  );
}

export default TopBar;
