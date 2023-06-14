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
      {tabContent.map((tab) => (
        <TabContent
          tab={tab}
          key={tab.id}
        />
      ))}
    </div>
  )
}