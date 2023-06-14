import { useCallback } from "react";
import { getAppHref, normalizeUrbitColor } from "@/logic/utils";
import { Pane } from "@/types/surface";
import { useInstalledApps } from "@/state/docket";
import AddIcon from "../icons/AddIcon";

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

interface NewSurfaceModalProps {
  isOpen: boolean;
  onSurfaceSelected: (pane: Pane) => void;
  onClose: () => void;
}

const NewTabModal = ({
  isOpen,
  onSurfaceSelected,
  onClose,
}: NewSurfaceModalProps) => {
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
        <li className="flex cursor-pointer items-center gap-3 p-2" onClick={() => onSurfaceSelected({ title: 'widgets', type: 'widget', widgets: [] })}>
          <AddIcon className="h-6 w-6" />
          Widgets
        </li>
        {[dashAppMeta, ...apps].map((app) => {
          return (
            <li
              className="flex cursor-pointer items-center gap-3 p-2"
              key={app.title}
              onClick={() =>
                onSurfaceSelected({
                  title: app.title,
                  type: 'app',
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewTabModal;
