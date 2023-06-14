import { Layout } from "react-grid-layout";

export interface Surface {
  id: string;
  addedAt: number;
  panes: Pane[];
  // a title which supercedes the pane titles
  title?: string;
}

export type Pane = AppPane | WidgetPane;

export interface AppPane {
  title: string;
  type: "app";
  path: string;
}

export interface WidgetPane {
  title: string;
  type: "widget";
  widgets: Widget[];
}

export interface WidgetProps<Config = any> {
  widget: Widget<Config>;
}

export interface WidgetDef {
  /** Unique id for this definition */
  id: string;
  /** Available config parameters, could be json-schema? */
  params: {};
  /** Component used to render this def */
  Component: React.ComponentType<WidgetProps>;
}

export interface Widgets {
  type: "widgets";
  widgets: Widget[];
}

type WidgetType = string; /** should be keys from widget definitions */

export interface Widget<Config = any> {
  /** unique id for instance */
  id: string;
  type: WidgetType;
  layout: Layout;
  config: Config;
}
