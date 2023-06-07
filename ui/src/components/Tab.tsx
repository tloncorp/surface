import { MouseEventHandler, useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import tabStyle from "../styles";
import { TabConfig } from "../types";

const Tab = ({
  tab,
  index,
  onPress,
  onPressClose,
  onPressSplit,
  isActive,
}: {
  tab: TabConfig;
  index: number;
  onPress?: (tab: TabConfig) => void;
  onPressClose?: (tab: TabConfig) => void;
  onPressSplit?: (tab: TabConfig) => void;
  isActive: boolean;
}) => {
  const handlePress = useCallback(() => {
    onPress?.(tab);
  }, [onPress, tab]);

  const handlePressClose = useCallback(() => {
    onPressClose?.(tab);
  }, [onPressClose, tab]);

  const handlePressSplit: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onPressSplit?.(tab);
    },
    [onPressSplit, tab]
  );

  return (
    <Draggable key={tab.id} draggableId={tab.id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => {
        return (
          <div
            key={tab.id}
            onClick={handlePress}
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
          >
            <div
              style={{
                ...tabStyles.tab,
                backgroundColor: isActive ? "#FFF" : "#d5d5d5",
              }}
            >
              <span>{tab.panes.map((p) => p.title).join(" + ")}</span>
              {tab.panes.length > 1 && (
                <a style={tabStyles.splitButton} onClick={handlePressSplit}>
                  Split
                </a>
              )}
              <a style={tabStyles.closeButton} onClick={handlePressClose}>
                &times;
              </a>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

const tabStyles: Record<string, React.CSSProperties> = {
  tab: { ...tabStyle },
  splitButton: {
    display: "block",
    fontSize: 10,
    padding: "3px 4px 2px",
    borderRadius: 4,
    textTransform: "uppercase",
    backgroundColor: `rgba(0,0,0,.1)`,
  },
  closeButton: {
    display: "block",
    fontSize: 12,
    textTransform: "uppercase",
    backgroundColor: `rgba(0,0,0,.1)`,
    aspectRatio: 1,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    textAlign: "center",
    padding: "0 0 2px",
    lineHeight: 1.3,
  },
};

export default Tab;
