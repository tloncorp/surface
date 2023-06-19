import { WidgetProps } from '@/widgets';
import ClassicClock from './ClassicClock';
import ColorClock from './ColorClock';
import SeasonClock from './SeasonClock';
import TextClock from './TextClock';

export interface ClockProps<T extends {} = {}> {
  size: [number, number];
  config: T;
}

const clockComponents = {
  classic: ClassicClock,
  color: ColorClock,
  seasons: SeasonClock,
  text: TextClock,
};

type ClockType = keyof typeof clockComponents;

const ClockWidget = <T extends { type: ClockType }>({
  widget,
  layout,
}: WidgetProps<T>) => {
  if (!widget.config.type || !layout) {
    return 'Loading...';
  }

  const Component = clockComponents[widget.config.type];
  return Component ? (
    <Component
      size={[layout.w, layout.h] as [number, number]}
      config={widget.config}
    />
  ) : (
    'Missing clock type'
  );
};

export default ClockWidget;
