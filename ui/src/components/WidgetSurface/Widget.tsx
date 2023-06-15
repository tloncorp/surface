import { WidgetProps } from '@/widgets';
import React, { HTMLProps, PropsWithChildren } from "react";
import { widgets } from '@/widgets';

const Widget = React.forwardRef<
  HTMLDivElement,
  WidgetProps &
    // We need to forward a number of props to the underlying div for
    // compatibility with `react-grid-layout`.
    // More info: https://github.com/react-grid-layout/react-grid-layout#custom-child-components-and-draggable-handles
    PropsWithChildren<HTMLProps<HTMLDivElement>>
>(({ widget, ...forwardProps }, ref) => {
  const def = widgets[widget.type];

  if (!def) return <>No renderer found for widget</>;

  return (
    <div data-grid={widget.layout} ref={ref} {...forwardProps}>
      {def ? (
        <def.Component widget={widget} />
      ) : (
        "No renderer found for widget type" + widget.type
      )}
    </div>
  );
});

export default Widget;
