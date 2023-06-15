import { useCallback } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { getAppHref } from '@/logic/utils';
import { Pane } from '@/types/surface';
import { ChargeWithDesk, useInstalledApps } from '@/state/docket';
import CaretDownIcon from './icons/CaretDownIcon';
import OpenAppIcon from './icons/OpenAppIcon';
import { useSurfaceState } from '@/state/surface';
import { DocketImage } from './DocketImage';
import Add16Icon from './icons/Add16Icon';

interface SurfaceMenuProps {
  onSurfaceSelected?: (pane: Pane) => void;
}

const SurfaceMenu = ({ onSurfaceSelected }: SurfaceMenuProps) => {
  const { addSurfaceWithPane } = useSurfaceState();
  const apps = useInstalledApps();

  const onAppSelected = useCallback((app: ChargeWithDesk) => {
    addSurfaceWithPane({
      id: `${app.title}-${Date.now()}`,
      title: app.title,
      type: 'app',
      path: getAppHref(app.href)
    });
  }, []);

  const onNewSurfaceSelected = useCallback(() => {
    addSurfaceWithPane({
      id: Date.now().toString(),
      title: 'New Tab',
      type: 'widget',
      widgets: []
    });
  }, []);

  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        className="nav-button default-focus"
        aria-label="Add Surface"
      >
        <OpenAppIcon className="mr-2 h-5 w-5 text-gray-400" />
        <CaretDownIcon className="h-4 w-4 text-gray-400" />
      </Dropdown.Trigger>
      <Dropdown.Content
        align="start"
        sideOffset={8}
        side="bottom"
        className="z-40 max-h-[60vh] min-w-[300px] max-w-[448px] space-y-1 overflow-y-auto rounded-md bg-white p-3 text-sm font-semibold shadow-md"
      >
        <Dropdown.Item
          className="default-focus flex cursor-pointer items-center gap-2 rounded-md p-2"
          onSelect={onNewSurfaceSelected}
        >
          <Add16Icon className="m-1 h-4 w-4 text-gray-400" />
          New Tab
        </Dropdown.Item>
        <Dropdown.Label className="p-2 text-gray-400">Open App</Dropdown.Label>
        {apps.map(app => {
          return (
            <Dropdown.Item
              className="default-focus flex cursor-pointer items-center gap-2 rounded-md p-2"
              key={app.title}
              onSelect={() => onAppSelected(app)}
            >
              <DocketImage size="xs" {...app} />
              <span className="flex-none">{app.title}</span>
              <span className="flex-1 text-gray-400 line-clamp-1">
                {app.info}
              </span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default SurfaceMenu;
