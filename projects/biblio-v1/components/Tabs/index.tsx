import React from "react";

interface TabButton {
  title: string;
  click: () => void;
}

interface Tab {
  id: any;
  title: string;
  buttons?: TabButton[];
}

interface TabsProps {
  tabs: Tab[];
  initialActiveTab: any;
  children: any;
}

export function Tabs({ tabs, children, initialActiveTab }: TabsProps) {
  const [currentTab, setCurrentTab] = React.useState<any>(initialActiveTab);

  return (
    <div style={{ flexDirection:'column', ...styles.container }}>
      <div style={styles.header}>
        <nav>
          <ul className="tab-options">
            {tabs.map((tab) => {
              return (
                <li
                  key={`tab-${tab.id}`}
                  onClick={() => setCurrentTab(tab.id)}
                  className={currentTab === tab.id ? "tab-active" : "tab"}
                >
                  {tab.title}
                </li>
              );
            })}
          </ul>
        </nav>
        <div>
          {tabs
            .find((tab) => tab.id === currentTab)
            ?.buttons?.map((btn) => {
              return (
                <button key={`btn-${btn.title}`} onClick={btn.click}>
                  {btn.title}
                </button>
              );
            })}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
  },
};
