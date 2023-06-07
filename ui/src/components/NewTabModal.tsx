import useInstalledApps from "@/useInstalledApps";
import { useCallback } from "react";
import { getAppHref, normalizeUrbitColor } from "@/util";
import { TabContentConfig } from "../types";

const NewTabPicker = ({
  isOpen,
  onTabSelected,
  onClose,
}: {
  isOpen: boolean;
  onTabSelected: (pane: TabContentConfig) => void;
  onClose: () => void;
}) => {
  const apps = useInstalledApps();

  const handleBackdropClicked = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div style={styles.container} onClick={handleBackdropClicked}>
      <ul style={styles.content}>
        {apps.map((app) => {
          return (
            <div
              style={styles.appListItem}
              key={app.title}
              onClick={() =>
                onTabSelected({
                  title: app.title,
                  path: getAppHref(app.href),
                })
              }
            >
              <div
                style={{
                  ...styles.iconBox,
                  backgroundColor: normalizeUrbitColor(app.color),
                }}
              ></div>
              {app.title}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default NewTabPicker;

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: "16px",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow: "0 4px 16px rgba(0,0,0,.2)",
    padding: 8,
  },
  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  appListItem: {
    cursor: "pointer",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
};
