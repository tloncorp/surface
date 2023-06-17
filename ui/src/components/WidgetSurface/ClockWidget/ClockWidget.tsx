import { WidgetProps } from "@/widgets";
import ClassicClock from "./ClassicClock";
import ColorClock from "./ColorClock";
import SeasonClock from "./SeasonClock";
import TextClock from "./TextClock";

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
