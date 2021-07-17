import { ReactElement, useCallback, useState } from "react";
import { Ellipsis } from "@iron-hide/assets";
import Styles from "./tabs.module.scss";

interface ITabs {
  children: ReactElement[];
}

interface ITabTitle {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
}

export const TabTitle: React.FC<ITabTitle> = ({
  title,
  setSelectedTab,
  index,
}) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <div onClick={onClick} className={Styles.tab__title}>
      <div className={Styles.tab__title_text}>{title}</div>
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
