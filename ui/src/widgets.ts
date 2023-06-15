import { Layout } from "react-grid-layout";
import ClockWidget from "./components/WidgetSurface/ClockWidget/ClockWidget";
import { ClockIcon } from "./components/icons/ClockIcon";
import { IconProps } from "./components/icons/icon";
import { AppShortcutIcon } from "./components/icons/AppShortcutIcon";
import { PinRefIcon } from "./components/icons/PinRefIcon";
import { LatestPostIcon } from "./components/icons/LatestPostIcon";
import { MiniNotificationIcon } from "./components/icons/MiniNotificationIcon";
import AppTileWidget from "./components/WidgetSurface/AppTileWidget/AppTileWidget";
import NoteWidget from "./components/WidgetSurface/NoteWidget/NoteWidget";
import ActivityWidget from "./components/WidgetSurface/ActivityWidget/ActivityWidget";

export interface WidgetProps<Config = any> {
  widget: Widget<Config>;
}

export interface WidgetDef<Config = any> {
  /** Unique id for this definition */
  id: WidgetType;
  /** Human readable name */
  name: string;
  /** Short summary of what it does */
  description: string;
  /** Icon to represent widget */
  icon?: React.ComponentType<IconProps>;
  /** Available config parameters, could be json-schema? */
  params: {};
  /** Component used to render this def */
  Component: React.ComponentType<WidgetProps<Config>>;
  defaultSize: { w: number; h: number };
}

export interface Widgets {
  type: "widgets";
  widgets: Widget[];
}

type WidgetType = keyof typeof widgets; /** should be keys from widget definitions */

export interface Widget<Config = any> {
  /** unique id for instance */
  id: string;
  type: WidgetType;
  layout: Layout;
  config: Config;
}

const widgets = {
  clock: {
    id: "clock",
    name: "Clock",
    description: "Select from a gaggle of faces",
    icon: ClockIcon,
    params: {},
    Component: ClockWidget,
    defaultSize: { w: 3, h: 2 }
  },
  shortcut: {
    id: "shortcut",
    name: "Shortcut",
    description: "Pin an app to your Landscape",
    icon: AppShortcutIcon,
    params: {},
    Component: AppTileWidget,
    defaultSize: { w: 2, h: 2 }
  },
  reference: {
    id: "reference",
    name: "Reference",
    description: "Pin a reference to your Landscape",
    icon: PinRefIcon,
    params: {},
    Component: ClockWidget,
    defaultSize: { w: 3, h: 2 }
  },
  'latest-post': {
    id: "latest-post",
    name: "Latest Post",
    description: "Pin the latest post from a Gallery/Notebook",
    icon: LatestPostIcon,
    params: {},
    Component: NoteWidget,
    defaultSize: { w: 4, h: 5 }
  },
  'mini-notifications': {
    id: "mini-notifications",
    name: "Mini Notifications",
    description: "Surface latest notification received",
    icon: MiniNotificationIcon,
    params: {},
    Component: ActivityWidget,
    defaultSize: { w: 4, h: 4 }
  },
}

const typedWidgets = widgets as { [key in WidgetType]: WidgetDef };

export { typedWidgets as widgets };
