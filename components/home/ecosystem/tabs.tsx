type TabData = {
  title: string;
  icon: React.FC;
  projects: string[];
};

interface EcosystemTabsProps {
  tabsData: TabData[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

export default function EcosystemTabs({
  tabsData,
  selectedTab,
  setSelectedTab,
}: EcosystemTabsProps) {
  return (
    <ul className="flex w-full items-center justify-between gap-4">
      {tabsData.map((tab, index) => (
        <li key={tab.title} onClick={() => setSelectedTab(index)}>
          <button
            className={`${selectedTab === index && "bg-black/80 backdrop-blur-lg"} flex flex-col items-center gap-4 rounded-t-lg px-4 py-2 transition-all duration-300 ease-in-out hover:bg-black/80 hover:backdrop-blur-sm lg:px-10 lg:py-7`}
          >
            <div className="flex flex-col items-center gap-2 lg:flex-row">
              <span className="h-6 w-6 shrink-0">
                <tab.icon />
              </span>
              <h3 className="text-xs font-medium lg:text-lg">{tab.title}</h3>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
