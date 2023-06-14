import { useTabState } from "@/state/tabs";
import { useMemo } from "react";
import TabContent from "./Tabs/TabContent";

export const Surface = () => {
  const { tabs, activeTab } = useTabState();
  
  const tabContent = useMemo(
    () => tabs.sort((a, b) => a.addedAt - b.addedAt),
    [tabs]
  );
  
  return (
    <div className="relative flex h-full w-full flex-1 flex-col">
      {tabContent.map((tab) => {
        return (
          <div
            key={tab.id}
            className="absolute left-0 top-0 flex h-full w-full gap-2 p-2 pt-0"
          >
            {tab.panes.map((pane) => (
              <TabContent
                config={{ path: pane.path }}
                isLive={tab.id === activeTab}
                key={pane.path}
              />
            ))}
          </div>
        );
      })}
    </div>
  )
}