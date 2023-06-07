import { CSSProperties, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import Tab from "./Tab";
import tabStyle from "../styles";
import { TabConfig } from "../types";

const TabList = ({
  tabs,
  activeTab,
  onTabClosed,
  onTabSelected,
  onTabMoved,
  onTabsCombined,
  onTabSplit,
  onNewTabPressed,
}: {
  tabs: TabConfig[];
  activeTab: string | null;
  onNewTabPressed: () => void;
  onTabSelected: (tab: TabConfig) => void;
  onTabClosed: (tab: TabConfig) => void;
  onTabsCombined: (sourceId: string, targetId: string) => void;
  onTabMoved: (sourceIndex: number, destinationIndex: number) => void;
  onTabSplit: (tab: TabConfig) => void;
}) => {
  const handleDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      if (result.combine) {
        onTabsCombined(result.draggableId, result.combine.draggableId);
        return;
      }
      const sourceIndex = result.source.index;
      const destinationIndex = result.destination?.index;
      if (
        sourceIndex !== destinationIndex &&
        destinationIndex !== null &&
        typeof destinationIndex !== "undefined"
      ) {
        onTabMoved(sourceIndex, destinationIndex);
      }
    },
    [onTabMoved, onTabsCombined]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="tabs"
        direction="horizontal"
        isCombineEnabled={true}
      >
        {({ placeholder: dragPlaceholder, innerRef, droppableProps }) => {
          return (
            <nav {...droppableProps} ref={innerRef} style={styles.container}>
              {tabs.map((tab, index) => (
                <Tab
                  tab={tab}
                  index={index}
                  isActive={tab.id === activeTab}
                  onPressClose={onTabClosed}
                  onPress={onTabSelected}
                  onPressSplit={onTabSplit}
                />
              ))}

              {dragPlaceholder}

              <button style={styles.addTabButton} onClick={onNewTabPressed}>
                Open App
              </button>
            </nav>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 8,
    gap: 8,
    background: "#E5E5E5",
    width: "100%",
  },
  addTabButton: {
    ...tabStyle,
    background: "transparent",
    border: 0,
    outline: 0,
    color: "#666",
  },
};

export default TabList;
