import { useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder
} from 'react-beautiful-dnd';
import Tab from '@/components/Tabs/Tab';
import { useTabState } from '@/state/tabs';

const TabList = () => {
  const { tabs, activeTab, moveTab, combineTabs } = useTabState();
  const handleDragEnd: OnDragEndResponder = useCallback(
    result => {
      if (result.combine) {
        combineTabs(result.draggableId, result.combine.draggableId);
        return;
      }
      const sourceIndex = result.source.index;
      const destinationIndex = result.destination?.index;
      if (
        sourceIndex !== destinationIndex &&
        destinationIndex !== null &&
        typeof destinationIndex !== 'undefined'
      ) {
        moveTab(sourceIndex, destinationIndex);
      }
    },
    [moveTab, combineTabs]
  );

  if (tabs.length === 0) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="tabs"
        direction="horizontal"
        isCombineEnabled={true}
      >
        {({ placeholder: dragPlaceholder, innerRef, droppableProps }) => {
          return (
            <div
              {...droppableProps}
              ref={innerRef}
              className="flex-initial flex gap-2"
            >
              {tabs.map((tab, index) => (
                <Tab
                  tab={tab}
                  index={index}
                  isActive={tab.id === activeTab}
                  key={tab.id}
                />
              ))}

              {dragPlaceholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default TabList;
