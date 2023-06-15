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

  // All values in `react-grid-layout` `Layout`s are specified in grid units, and
  // need to be translated to pixel dimensions to be useful. It's kind of a pain
  // to do the translation, so for now we're just grabbing them out of the style
  // attribute it's already calculating.
  // TODO: Something better than this
  const { width, height } = forwardProps.style ?? { width: 0, height: 0 };
  const layout = {
    ...widget.layout,
    w: typeof width === "string" ? parseInt(width) : width ?? 0,
    h: typeof height === "string" ? parseInt(height) : height ?? 0,
  };

  if (!def) return <>No renderer found for widget</>;

  return (
    <div
      data-grid={widget.layout}
      ref={ref}
      {...forwardProps}
      style={{ ...forwardProps.style }}
    >
      {def ? (
        <def.Component widget={{ ...widget, layout }} />
      ) : (
        "No renderer found for widget type" + widget.type
      )}
    </div>
  );
});

export default Widget;
