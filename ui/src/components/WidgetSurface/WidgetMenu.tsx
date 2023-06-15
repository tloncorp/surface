import { useSurfaceState } from '@/state/surface';
import { WidgetPane } from '@/types/surface';
import { WidgetDef, widgets } from '@/widgets';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { useCallback } from 'react';

interface WidgetMenuProps {
  id: string;
  pane: WidgetPane;
}

export const WidgetMenu = ({ id, pane }: WidgetMenuProps) => {
  const { addWidget } = useSurfaceState();

  const onWidgetSelected = useCallback((widget: WidgetDef) => {
    addWidget(id, pane, widget);
  }, []);

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button className='nav-button default-focus'>Add Widget</button>
      </Dropdown.Trigger>
      <Dropdown.Content align="start" sideOffset={8} side="top" className="z-40 max-h-[60vh] min-w-[300px] max-w-[448px] overflow-y-auto rounded-md bg-white p-3 font-semibold text-sm shadow-md space-y-1">
        <Dropdown.Label className='text-gray-400 p-2'>
          Add Widget
        </Dropdown.Label>
        {Object.values(widgets).map((widget) => {
          const Icon = widget.icon;
          return (
            <Dropdown.Item key={widget.id} onSelect={() => onWidgetSelected(widget)} className='default-focus flex items-center gap-2 p-2 rounded-md'>
              {Icon && <Icon className="h-6 w-6" />}
              <span className="flex-none">{widget.name}</span>
              <span className="flex-1 text-gray-400 line-clamp-1">{widget.description}</span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  )
}