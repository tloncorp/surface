import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { InteractionContext } from '@/components/InteractionContext';

/**
 * Responsible for rendering an app in an iframe.
 */
const TabContent = ({
  config,
  isLive
}: {
  config: { path: string };
  /**
   * Whether this widget is active on screen. If not, we'll stop rendering after
   * 10 minutes, to save resources.
   */
  isLive: boolean;
}) => {
  const [shouldRender, setShouldRender] = React.useState(isLive);
  const { isDragging: dragInteractionInProgress } =
    useContext(InteractionContext);

  // Render state management. We want to keep tabs around if they're visible, or
  // if the user is likely to return to them. Currently, this means we render if
  // the tab is live, or if it was live within the last 10 minutes.
  useEffect(() => {
    if (!isLive && shouldRender) {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 1000 * 60 * 10);
      return () => timeout && clearTimeout(timeout);
    }
    if (isLive && !shouldRender) {
      setShouldRender(true);
    }
  }, [isLive, shouldRender]);

  return shouldRender ? (
    <div
      style={{
        // by default, iframes will eat pointer events, which can cause issues during drag
        pointerEvents: dragInteractionInProgress ? 'none' : undefined
      }}
      className={cn('flex h-full w-full flex-col overflow-hidden rounded-lg', {
        'absolute left-0 top-0': !isLive,
        relative: isLive
      })}
    >
      <iframe
        className="min-h-0 flex-1 overflow-hidden rounded-lg border-0 bg-white shadow-md"
        src={config.path}
      />
    </div>
  ) : null;
};

export default TabContent;
