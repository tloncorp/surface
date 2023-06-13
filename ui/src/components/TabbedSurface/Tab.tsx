import { MouseEventHandler, useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import cn from "classnames";
import { TabConfig } from "../../types";

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
              className={cn(
                "flex h-9 min-w-[100px] items-center justify-between gap-2 rounded-md p-2",
                {
                  "bg-white": isActive,
                  "bg-gray-200": !isActive,
                }
              )}
            >
              <span>{tab.panes.map((p) => p.title).join(" + ")}</span>
              {tab.panes.length > 1 && (
                <a
                  className="rounded bg-gray-100 px-2 py-1 text-xs uppercase underline"
                  onClick={handlePressSplit}
                >
                  Split
                </a>
              )}
              <a
                className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 text-sm uppercase underline"
                onClick={handlePressClose}
              >
                &times;
              </a>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Tab;
