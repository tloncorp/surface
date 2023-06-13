import { useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder
} from 'react-beautiful-dnd';
import Tab from '@/components/TabbedSurface/Tab';
import { TabConfig } from '@/types';
import MagnifyingGlassIcon from '@/components/icons/MagnifyingGlassIcon';
import OpenAppIcon from '@/components/icons/OpenAppIcon';
import CaretDownIcon from '@/components/icons/CaretDownIcon';
import CompassIcon from '@/components/icons/CompassIcon';
import BellIcon from '@/components/icons/BellIcon';
import Avatar from '@/components/Avatar';

const TabList = ({
  tabs,
  activeTab,
  onTabClosed,
  onTabSelected,
  onTabMoved,
  onTabsCombined,
  onTabSplit,
  onNewTabPressed
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
    result => {
      if (result.combine) {
        onTabsCombined(result.draggableId, result.combine.draggableId);
        return;
      }
      const sourceIndex = result.source.index;
      const destinationIndex = result.destination?.index;
      if (
        sourceIndex !== destinationIndex &&
        destinationIndex !== null &&
        typeof destinationIndex !== 'undefined'
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
            <div className="space-between flex w-full items-center text-base">
              <nav
                {...droppableProps}
                ref={innerRef}
                className="flex w-full flex-row gap-2 bg-gray-100 p-2"
              >
                <button className="flex h-8 items-center justify-center rounded-md bg-white/40 p-2 text-gray-800">
                  <MagnifyingGlassIcon className="mr-2 h-5 w-5" />
                  Leap
                </button>
                {tabs.map((tab, index) => (
                  <Tab
                    tab={tab}
                    index={index}
                    isActive={tab.id === activeTab}
                    onPressClose={onTabClosed}
                    onPress={onTabSelected}
                    onPressSplit={onTabSplit}
                    key={tab.id}
                  />
                ))}

                {dragPlaceholder}

                <button
                  className="flex h-8 items-center justify-center rounded-md p-2 text-gray-800"
                  onClick={onNewTabPressed}
                >
                  <OpenAppIcon className="mr-2 h-5 w-5 text-gray-400" />
                  <CaretDownIcon className="h-4 w-4 text-gray-400" />
                </button>
              </nav>
              <nav className="flex w-full flex-row items-center justify-end gap-2 bg-gray-100 p-2">
                <button className="flex h-8 items-center justify-center rounded-md bg-white/40 p-2 text-gray-800">
                  <CompassIcon className="mr-2 h-4 w-4" />
                  Find Apps
                </button>
                <button className="flex h-8 items-center justify-center rounded-md bg-white/40 p-2 text-gray-800">
                  <p className="w-5 text-lg">?</p>
                </button>
                <button className="flex h-8 items-center justify-center rounded-md bg-white/40 p-2 text-gray-800">
                  <BellIcon className="h-5 w-5" />
                </button>
                <Avatar ship={window.our} size="small" />
              </nav>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default TabList;
