import { useCallback } from 'react';
import { getAppHref, normalizeUrbitColor } from '@/logic/utils';
import { TabContentConfig } from '@/types';
import { useCharges, useInstalledApps } from '@/state/docket';

const NewTabPicker = ({
  isOpen,
  onTabSelected,
  onClose
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
      <ul className="w-[300px] rounded-lg bg-white p-2 shadow-xl">
        {apps.map(app => {
          return (
            <div
              className="flex cursor-pointer items-center gap-3 p-2"
              key={app.title}
              onClick={() =>
                onTabSelected({
                  title: app.title,
                  path: getAppHref(app.href)
                })
              }
            >
              <div
                style={{
                  backgroundColor: normalizeUrbitColor(app.color)
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

export default NewTabPicker;
