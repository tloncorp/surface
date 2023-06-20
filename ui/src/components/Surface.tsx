import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { InteractionContext } from '@/components/InteractionContext';
import { Pane, Surface as SurfaceType } from '@/types/surface';
import { useSurfaceState } from '@/state/surface';
import WidgetGrid from './WidgetSurface/WidgetGrid';

interface SurfacePaneProps {
  id: string;
  pane: Pane;
  isActive: boolean;
}

/**
 * Responsible for rendering an app in an iframe.
 */
const SurfacePane = ({ id, pane, isActive }: SurfacePaneProps) => {
  const [shouldRender, setShouldRender] = React.useState(isActive);
  const { isDragging: dragInteractionInProgress } =
    useContext(InteractionContext);

  // Render state management. We want to keep tabs around if they're visible, or
  // if the user is likely to return to them. Currently, this means we render if
  // the tab is live, or if it was live within the last 10 minutes.
  useEffect(() => {
    if (!isActive && shouldRender) {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 1000 * 60 * 10);
      return () => timeout && clearTimeout(timeout);
    }
    if (isActive && !shouldRender) {
      setShouldRender(true);
    }
  }, [isActive, shouldRender]);

  return shouldRender ? (
    <div
      style={{
        // by default, iframes will eat pointer events, which can cause issues during drag
        pointerEvents: dragInteractionInProgress ? 'none' : undefined,
      }}
      className={cn('flex flex-col rounded-lg', {
        'absolute left-0 top-0 h-0 w-0': !isActive,
        'relative h-full w-full': isActive,
      })}
    >
      {pane.type === 'app' ? (
        <iframe
          className="min-h-0 flex-1 overflow-hidden rounded-lg border-0 bg-white shadow-md"
          src={pane.path}
        />
      ) : (
        <div className="h-full rounded-lg border-2 border-gray-200 border-opacity-50">
          <WidgetGrid id={id} pane={pane} />
        </div>
      )}
    </div>
  ) : null;
};

interface SurfaceProps {
  surface: SurfaceType;
}

const Surface = ({ surface }: SurfaceProps) => {
  const { activeSurface } = useSurfaceState();
  const isActive = surface.id === activeSurface;

  return (
    <div
      className={cn(
        'absolute left-0 top-0 flex h-full w-full gap-2 p-2 pt-0',
        isActive ? 'z-30' : 'z-20'
      )}
    >
      {surface.panes.map((pane, index) => (
        <SurfacePane
          id={surface.id}
          pane={pane}
          isActive={isActive}
          key={index}
        />
      ))}
    </div>
  );
};

export default Surface;
