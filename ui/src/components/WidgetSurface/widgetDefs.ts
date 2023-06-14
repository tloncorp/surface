import { WidgetDef } from "@/types/surface";
import ClockWidget from "./ClockWidget";

const widgetDefs: Record<string, WidgetDef> = {
  clock: {
    id: "clock",
    params: {},
    Component: ClockWidget,
  },
};

export default widgetDefs;
