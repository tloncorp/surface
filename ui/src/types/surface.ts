import { Widget } from "@/widgets";

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
