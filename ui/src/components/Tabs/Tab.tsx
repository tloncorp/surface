import { MouseEventHandler, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import cn from 'classnames';
import { Surface } from '@/types/surface';
import { useSurfaceState } from '@/state/surface';

interface TabProps {
  surface: Surface;
  index: number;
  isActive: boolean;
  onPress?: (surface: Surface) => void;
  onPressClose?: (surface: Surface) => void;
  onPressSplit?: (surface: Surface) => void;
};

const Tab = ({
  surface,
  index,
  onPress,
  onPressClose,
  onPressSplit,
  isActive
}: TabProps) => {
  const { switchSurface, removeSurface, splitSurface } = useSurfaceState();
  const handlePress = useCallback(() => {
    switchSurface(surface.id);
    onPress?.(surface);
  }, [onPress, surface]);

  const handlePressClose = useCallback(() => {
    removeSurface(surface.id);
    onPressClose?.(surface);
  }, [onPressClose, surface]);

  const handlePressSplit: MouseEventHandler = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      splitSurface(surface.id);
      onPressSplit?.(surface);
    },
    [onPressSplit, surface]
  );

  return (
    <Draggable key={surface.id} draggableId={surface.id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => {
        return (
          <div
            key={surface.id}
            onClick={handlePress}
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
          >
            <div
              className={cn(
                'flex h-8 min-w-[100px] items-center justify-between gap-2 rounded-md p-2',
                {
                  'bg-white/80': isActive,
                  'bg-white/40': !isActive
                }
              )}
            >
              <span className='whitespace-nowrap'>{surface.title || surface.panes.map(p => p.title).join(' + ')}</span>
              {surface.panes.length > 1 && (
                <button
                  className="rounded bg-gray-100 px-2 py-1 text-xs uppercase"
                  onClick={handlePressSplit}
                >
                  Split
                </button>
              )}
              <button
                className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 text-sm uppercase"
                onClick={handlePressClose}
              >
                &times;
              </button>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Tab;
