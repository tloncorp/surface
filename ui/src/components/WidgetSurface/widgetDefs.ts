import { WidgetDef } from '@/types/surface';
import ActivityWidget from './ActivityWidget/ActivityWidget';
import AppTileWidget from './AppTileWidget/AppTileWidget';
import ClockWidget from './ClockWidget';
import NoteWidget from './NoteWidget/NoteWidget';

const widgetDefs: Record<string, WidgetDef> = {
  clock: {
    id: 'clock',
    params: {},
    Component: ClockWidget
  },
  appTile: {
    id: 'appTile',
    params: {},
    Component: AppTileWidget
  },
  activity: {
    id: 'activity',
    params: {},
    Component: ActivityWidget
  },
  note: {
    id: 'note',
    params: {},
    Component: NoteWidget
  }
};

export default widgetDefs;
