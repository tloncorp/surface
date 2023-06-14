import { useCallback } from "react";
import { getAppHref, normalizeUrbitColor } from "@/logic/utils";
import { TabContentConfig } from "@/types";
import { useInstalledApps } from "@/state/docket";

/**
 * Dash is the app that lets you create a widget grid.
 * Doesn't actually exist, so we're hardcoding it here.
 */
const dashAppMeta = {
  title: "Dash",
  color: "0x0",
  href: {
    site: "/apps/surface/dash",
  },
};

const NewTabModal = ({
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
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClicked}
    >
      <ul className="max-h-[60vh] w-[300px] overflow-y-auto rounded-lg bg-white p-2 shadow-xl">
        {[dashAppMeta, ...apps].map((app) => {
          return (
            <div
              className="flex cursor-pointer items-center gap-3 p-2"
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
                  backgroundColor: normalizeUrbitColor(app.color),
                }}
                className="h-6 w-6 rounded"
              ></div>
              {app.title}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default NewTabModal;
