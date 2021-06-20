import Styles from "./top-bar.module.scss";
import logo from "./__assets__/thrive-logo.png";

export function TopBar() {
  return (
    <div className={Styles.top_bar}>
      <div className={Styles.top_bar__left_items}>
        <img src={logo} alt={"...Loading"} className={Styles.logo} />
      </div>
    </div>
  );
}

export default TopBar;
