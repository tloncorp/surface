import { useCallback, useEffect, useMemo, useState } from "react";
import { TabConfig } from "../../types";
import useSyncedStorage from "../../useSyncedStorage";
import { getQueryParam, setQueryParam } from "../../util";
import NewTabModal from "./NewTabModal";
import TabContent from "./TabContent";
import TabList from "./TabList";

const TabbedSurface = () => {
  const {
    tabs,
    activeTab,
    setActiveTab,
    addTab,
    removeTab,
    combineTabs,
    splitTab,
    moveTab,
  } = useTabs();

  const [showNewTabPicker, setShowNewTabPicker] = useState(false);

  const handlePressAddTab = useCallback(
    () => setShowNewTabPicker((p) => !p),
    []
  );

  const handleNewTabPickerClosed = useCallback(
    () => setShowNewTabPicker(false),
    []
  );

  const handleTabAdded = useCallback(
    ({ title, path }: { title: string; path: string }) => {
      const id = title + new Date().getTime();
      addTab({ id, panes: [{ title, path }], addedAt: new Date().getTime() });
      setShowNewTabPicker(false);
    },
    [addTab]
  );

  const tabContent = useMemo(
    () => tabs.sort((a, b) => a.addedAt - b.addedAt),
    [tabs]
  );

  const handleTabSelected = useCallback(
    (tab: TabConfig) => setActiveTab(tab.id),
    [setActiveTab]
  );

  const handleTabClosed = useCallback(
    (tab: TabConfig) => removeTab(tab.id),
    [removeTab]
  );

  const handleTabsCombined = useCallback(
    (sourceId: string, targetId: string) => {
      combineTabs(sourceId, targetId);
    },
    [combineTabs]
  );

  const handleTabMoved = useCallback(
    (sourceIndex: number, destinationIndex: number) =>
      moveTab(sourceIndex, destinationIndex),
    [moveTab]
  );

  const handleTabSplit = useCallback(
    (tab: TabConfig) => splitTab(tab.id),
    [splitTab]
  );

  return (
    <div className="bg-gray-100 flex h-full w-full flex-1 flex-col">
      <TabList
        tabs={tabs}
        activeTab={activeTab}
        onTabClosed={handleTabClosed}
        onTabSelected={handleTabSelected}
        onNewTabPressed={handlePressAddTab}
        onTabMoved={handleTabMoved}
        onTabSplit={handleTabSplit}
        onTabsCombined={handleTabsCombined}
      />
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

      <NewTabModal
        isOpen={showNewTabPicker}
        onTabSelected={handleTabAdded}
        onClose={handleNewTabPickerClosed}
      />
    </div>
  );
};

const useTabs = () => {
  const [tabs, setTabs] = useSyncedStorage<TabConfig[]>("tabs", []);
  const [activeTab, setActiveTab] = useState<string | null>(() => {
    return getQueryParam("tab") ?? tabs[0]?.id ?? null;
  });

  // Persist active tab to query param when it changes
  useEffect(() => {
    setQueryParam("tab", activeTab);
  }, [activeTab]);

  const tabIndexes = useMemo(() => {
    return tabs?.reduce<Record<string, number>>((acc, tab, index) => {
      acc[tab.id] = index;
      return acc;
    }, {});
  }, [tabs]);

  const addTab = useCallback(
    (tab: TabConfig) => {
      setTabs([...tabs, tab]);
      setActiveTab(tab.id);
    },
    [tabs, setTabs]
  );

  const removeTab = useCallback(
    (id: string) => {
      const index = tabIndexes?.[id] ?? -1;
      if (index === -1) {
        console.warn("attempted to remove non-existent tab", id);
        return;
      }
      const newTabs = [...tabs];
      newTabs.splice(index, 1);
      setTabs(newTabs);
      if (activeTab === id) {
        setActiveTab(newTabs[index - 1]?.id ?? null);
      }
    },
    [tabs, tabIndexes, setTabs, activeTab]
  );

  /**
   * Combines two tabs.
   * @param sourceId The id of the tab being dragged
   * @param targetId The id of the tab being dropped onto
   */
  const combineTabs = useCallback(
    (draggedId: string, dropTargetId: string) => {
      // Get indexes of specified tabs and sort --
      const draggedIndex = tabIndexes?.[draggedId] ?? -1;
      const dropTargetIndex = tabIndexes?.[dropTargetId] ?? -1;
      const draggedTab = tabs[draggedIndex];
      const dropTargetTab = tabs[dropTargetIndex];
      if (draggedIndex === -1) {
        console.warn("attempted to combine non-existent tab", draggedId);
        return;
      }
      if (dropTargetIndex === -1) {
        console.warn("attempted to combine non-existent tab", dropTargetId);
        return;
      }
      const newTab = {
        id: draggedTab.id,
        addedAt: draggedTab.addedAt,
        panes: [...dropTargetTab.panes, ...draggedTab.panes],
      };
      const newTabs = tabs.flatMap((tab) => {
        if (tab.id === draggedId) {
          return [];
        } else if (tab.id === dropTargetId) {
          return newTab;
        } else {
          return [tab];
        }
      });
      setTabs(newTabs);
      setActiveTab(newTab.id);
    },
    [tabs, setTabs, tabIndexes]
  );

  const splitTab = useCallback(
    (id: string) => {
      const index = tabIndexes?.[id] ?? -1;
      if (index === -1) {
        console.warn("attempted to split non-existent tab", id);
        return;
      }
      const tab = tabs[index];
      const splitTabs = tab.panes.map((pane, i) => {
        return {
          id: tab.id + "-" + i,
          addedAt: tab.addedAt + i,
          panes: [pane],
        };
      });
      const newTabs = [...tabs];
      newTabs.splice(index, 1, ...splitTabs);
      setTabs(newTabs);
      if (activeTab === id) {
        setActiveTab(splitTabs[0].id);
      }
    },
    [tabs, setTabs, tabIndexes, activeTab]
  );

  const moveTab = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      const newTabs = [...tabs];
      const tab = newTabs.splice(sourceIndex, 1)[0];
      newTabs.splice(targetIndex, 0, tab);
      setTabs(newTabs);
    },
    [tabs, setTabs]
  );

  return {
    tabs,
    activeTab,
    setActiveTab,
    addTab,
    removeTab,
    combineTabs,
    splitTab,
    moveTab,
  };
};

export default TabbedSurface;
