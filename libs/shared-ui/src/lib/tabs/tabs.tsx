import { ReactElement, useCallback, useState } from "react";
import { Ellipsis } from "@thrive/assets";
import Styles from "./tabs.module.scss";
import classNames from "classnames";

interface ITabs {
  children: ReactElement[];
}

interface ITabTitle {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  isActive?: boolean;
}

export const TabTitle: React.FC<ITabTitle> = ({
  title,
  setSelectedTab,
  index,
  isActive,
}) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <div
      onClick={onClick}
      className={classNames({
        [Styles.tab__title]: true,
        [Styles["tab__title--active"]]: isActive,
      })}
    >
      <div className={Styles.tab__title_text}>
        <i className={`${Styles.tab__title_window_icon} fa fa-table`} />
        {title}
      </div>
      <div className={Styles.tab__title_icon}>
        <Ellipsis />
      </div>
    </div>
  );
};

export const Tabs: React.FC<ITabs> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <div className={Styles.tab}>
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            isActive={selectedTab === index}
          />
        ))}
      </div>
      {children[selectedTab]}
    </div>
  );
};

interface ITab {
  title: string;
}

export const Tab: React.FC<ITab> = ({ children }) => {
  return <div>{children}</div>;
};
