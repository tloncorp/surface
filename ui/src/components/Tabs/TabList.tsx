import { useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder
} from 'react-beautiful-dnd';
import Tab from '@/components/Tabs/Tab';
import { useSurfaceState } from '@/state/surface';

const TabList = () => {
  const { surfaces, activeSurface, moveSurface, combineSurfaces } = useSurfaceState();
  const handleDragEnd: OnDragEndResponder = useCallback(
    result => {
      if (result.combine) {
        combineSurfaces(result.draggableId, result.combine.draggableId);
        return;
      }
      const sourceIndex = result.source.index;
      const destinationIndex = result.destination?.index;
      if (
        sourceIndex !== destinationIndex &&
        destinationIndex !== null &&
        typeof destinationIndex !== 'undefined'
      ) {
        moveSurface(sourceIndex, destinationIndex);
      }
    },
    [moveSurface, combineSurfaces]
  );

  if (surfaces.length === 0) {
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
              {surfaces.map((surface, index) => (
                <Tab
                  surface={surface}
                  index={index}
                  isActive={surface.id === activeSurface}
                  key={surface.id}
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
