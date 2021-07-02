import { ReactElement, useCallback, useState } from "react";
import styles from "./tabs.module.scss";

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
    <div onClick={onClick} className={styles.tab__title}>
      <span>{title}</span>
    </div>
  );
};

export const Tabs: React.FC<ITabs> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <div className={styles.tab}>
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
