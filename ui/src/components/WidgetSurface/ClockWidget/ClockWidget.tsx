import { useEffect, useRef, useState } from "react";
import ClassicClock from "./ClassicClock";
import ColorClock from "./ColorClock";
import SeasonClock from "./SeasonClock";
import TextClock from "./TextClock";
import useTime from "./useTime";
import { WidgetProps } from "@/widgets";

const ClockWidget = ({
  widget,
}: WidgetProps<{
  type: "classic";
}>) => {
  const Component = {
    classic: ClassicClock,
    color: ColorClock,
    seasons: SeasonClock,
    text: TextClock,
  }[widget.config.type];

  return <Component size={[widget.layout.w, widget.layout.h]} />;
};

export default ClockWidget;
