import { create } from "zustand";
import { persist, subscribeWithSelector} from "zustand/middleware";
import { share, isSupported } from "shared-zustand";
import { TabConfig } from "@/types";

interface TabState {
  tabs: TabConfig[];
  index: Record<string, number>;
  activeTab: string | null;
  switchTab: (id: string) => void;
  addTab: (tab: TabConfig) => void;
  removeTab: (id: string) => void;
  splitTab: (id: string) => void;
  /**
   * Combines two tabs.
   * @param sourceId The id of the tab being dragged
   * @param targetId The id of the tab being dropped onto
   */
  combineTabs: (sourceId: string, targetId: string) => void;
  moveTab: (sourceIndex: number, targetIndex: number) => void;
}

function updateTabs(tabs: TabConfig[]): Partial<TabState> {
  const index = tabs.reduce<Record<string, number>>((acc, tab, index) => {
    acc[tab.id] = index;
    return acc;
  }, {});

  return { tabs, index };
}

export const useTabState = create<TabState>()(subscribeWithSelector(persist((set, get) => ({
  tabs: [] as TabConfig[],
  index: {},
  activeTab: null,
  switchTab: (id) => {
    set({ activeTab: id });
  },
  addTab: (tab) => {
    set((draft) => ({ ...updateTabs([...draft.tabs, tab]), activeTab: tab.id }))
  },
  removeTab: (id) => {
    const { index: tabIndexes } = get();
    const index = tabIndexes?.[id] ?? -1;
    if (index === -1) {
      console.warn("attempted to remove non-existent tab", id);
      return;
    }

    set((draft) => {
      const { tabs, activeTab } = draft;
      const newTabs = [...tabs];
      newTabs.splice(index, 1);
      const newActiveTab = activeTab === id ? newTabs[index - 1]?.id ?? null : activeTab;
      return { 
        ...updateTabs(newTabs), 
        activeTab: newActiveTab,
      };
    });
  },
  splitTab: (id) => {
    const { tabs, index: tabIndexes, activeTab } = get();
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

    const newActiveTab = activeTab === id ? splitTabs[0].id as string : activeTab;
    set({ ...updateTabs(newTabs), activeTab: newActiveTab });
  },
  combineTabs: (draggedId, dropTargetId) => {
    const { tabs, index: tabIndexes } = get();
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
    
    set({ ...updateTabs(newTabs), activeTab: newTab.id });
  },
  moveTab: (sourceIndex, targetIndex) => {
    const { tabs } = get();
    const newTabs = [...tabs];
    const tab = newTabs.splice(sourceIndex, 1)[0];
    newTabs.splice(targetIndex, 0, tab);
    set({ ...updateTabs(newTabs) });
  },
}), {
  name: "tab-state",
})));

// progressive enhancement check.
if (isSupported()) {
  // share the property "count" of the state with other tabs
  share("tabs", useTabState);
}

const selActiveTab = (state: TabState) => state.activeTab;
export const useActiveTab = () => useTabState(selActiveTab);