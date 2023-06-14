import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { InteractionContext } from '@/components/InteractionContext';
import { TabConfig } from '@/types';
import { useTabState } from '@/state/tabs';

/**
 * Responsible for rendering an app in an iframe.
 */
const TabPane = ({
  config,
  isLive,
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
        pointerEvents: dragInteractionInProgress ? "none" : undefined,
      }}
      className={cn("flex flex-col overflow-hidden rounded-lg", {
        "absolute left-0 top-0 w-0 h-0": !isLive,
        "relative h-full w-full": isLive,
      })}
    >
      <iframe
        className="min-h-0 flex-1 overflow-hidden rounded-lg border-0 bg-white shadow-md"
        src={config.path}
      />
    </div>
  ) : null;
};

interface TabContentProps {
  tab: TabConfig;
}

const TabContent = ({ tab }: TabContentProps) => {
  const { activeTab } = useTabState();
  const isActive = tab.id === activeTab;

  return (
    <div className={cn("absolute left-0 top-0 flex h-full w-full gap-2 p-2 pt-0", isActive ? 'z-30' : 'z-20' )}>
      {tab.panes.map((pane) => (
        <TabPane
          config={pane}
          isLive={isActive}
          key={pane.path}
        />
      ))}
    </div>
  )
}

export default TabContent;
