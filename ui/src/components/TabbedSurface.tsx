import { getQueryParam, setQueryParam } from "@/util";
import {
  CSSProperties,
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSyncedStorage from "../useSyncedStorage";
import { InteractionContext } from "./InteractionContext";
import NewTabModal from "./NewTabModal";
import TabContent from "./TabContent";
import TabList from "./TabList";
import { TabConfig } from "../types";

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

  const handlePressAddTab = useCallback(() => {
    setShowNewTabPicker((p) => !p);
  }, []);

  const handleNewTabPickerClosed = useCallback(() => {
    setShowNewTabPicker(false);
  }, []);

  const handleTabAdded = useCallback(
    ({ title, path }: { title: string; path: string }) => {
      const id = title + new Date().getTime();
      addTab({ id, panes: [{ title, path }], addedAt: new Date().getTime() });
      setShowNewTabPicker(false);
    },
    [addTab]
  );

  const tabContent = useMemo(() => {
    return tabs.sort((a, b) => a.addedAt - b.addedAt);
  }, [tabs]);

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
    (tab: TabConfig) => {
      splitTab(tab.id);
    },
    [splitTab]
  );

  const { setIsDragging } = useContext(InteractionContext);

  const contenterContainerRef = useRef<HTMLDivElement>(null);

  const [paneSizes, setPaneSizes] = useState<number[]>([]);

  const handleStartSplitAdjustment: MouseEventHandler<HTMLDivElement> =
    useCallback((e) => {
      const startPosition = e.clientX;
      setIsDragging(true);
      const handleMouseMove = (e) => {
        if (!contenterContainerRef.current) return;
        const offset = e.clientX - startPosition;
        const delta = offset / contenterContainerRef.current?.offsetWidth;
      };
      const handleMouseUp = () => {
        clearHandlers();
      };
      const handleMouseLeave = () => {
        clearHandlers();
      };
      const clearHandlers = () => {
        setIsDragging(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mouseleave", handleMouseLeave);
      };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp, true);
      document.addEventListener("mouseleave", handleMouseLeave);
    }, []);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const handleTabContainerLayout = useCallback(() => {}, []);

  return (
    <div style={styles.container}>
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

      <div
        style={{ flex: 1, display: "flex", position: "relative" }}
        ref={contenterContainerRef}
      >
        {tabContent.map((tab) => {
          return (
            <div key={tab.id} style={styles.container}>
              {tab.panes.map((pane, index) => {
                return (
                  <>
                    <TabContent
                      config={{ path: pane.path }}
                      isLive={tab.id === activeTab}
                    />
                    {index !== tab.panes.length - 1 && (
                      // Add resize handle between panes
                      <div
                        onMouseDown={handleStartSplitAdjustment}
                        style={styles.resizeHandle}
                      />
                    )}
                  </>
                );
              })}
            </div>
          );
        })}
      </div>

      <NewTabModal
        isOpen={showNewTabPicker}
        onTabPicked={handleTabAdded}
        onClose={handleNewTabPickerClosed}
      />
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#E5e5e5",
  },
  tabContentContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 8,
    paddingTop: 0,
  },
  resizeHandle: {
    cursor: "pointer",
    backgroundColor: "transparent",
    width: "16px",
  },
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
      console.log("comine", draggedId, dropTargetId);
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
      console.log(newTabs);
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
