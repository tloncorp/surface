import React, { useContext, useEffect } from "react";
import { InteractionContext } from "./InteractionContext";

/**
 * Responsible for rendering an app in an iframe.
 */
const TabContent = ({
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
        ...styles.container,
        ...(isLive
          ? {}
          : {
              position: "absolute",
              width: 0,
              height: 0,
              top: 0,
              left: 0,
            }),
        // by default, iframes will eat pointer events, which can cause issues during drag
        pointerEvents: dragInteractionInProgress ? "none" : undefined,
      }}
    >
      <iframe style={styles.iframe} src={config.path} />
    </div>
  ) : null;
};

export default TabContent;

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderRadius: 8,
    overflow: "hidden",
  },
  iframe: {
    flex: 1,
    border: 0,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    minHeight: 0,
    boxShadow: "0 0 5px rgba(0,0,0,.1)",
  },
};
