export interface TabConfig {
  id: string;
  addedAt: number;
  panes: TabContentConfig[];
}

export interface TabContentConfig {
  title: string;
  path: string;
}
