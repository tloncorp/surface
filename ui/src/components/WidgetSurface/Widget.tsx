import { Widget as WidgetConfig, WidgetProps, widgets } from '@/widgets';
import React, { HTMLProps, PropsWithChildren, useCallback } from 'react';

const Widget = React.forwardRef<
  HTMLDivElement,
  // We need to forward a number of props to the underlying div for
  // compatibility with `react-grid-layout`.
  // More info: https://github.com/react-grid-layout/react-grid-layout#custom-child-components-and-draggable-handles
  WidgetProps & {
    editMode?: boolean;
    dragMode?: boolean;
    onPressEdit?: (widget: WidgetConfig<any>) => void;
    onPressRemove?: (widget: WidgetConfig<any>) => void;
  } & PropsWithChildren<HTMLProps<HTMLDivElement>>
>(
  (
    { widget, editMode, dragMode, onPressEdit, onPressRemove, ...forwardProps },
    ref
  ) => {
    const def = widgets[widget.type];

    // All values in `react-grid-layout` `Layout`s are specified in grid units, and
    // need to be translated to pixel dimensions to be useful. It's kind of a pain
    // to do the translation, so for now we're just grabbing them out of the style
    // attribute it's already calculating.
    // TODO: Something better than this
    const { width, height } = forwardProps.style ?? { width: 0, height: 0 };
    const layout = {
      ...widget.layout,
      w: typeof width === 'string' ? parseInt(width) : width ?? 0,
      h: typeof height === 'string' ? parseInt(height) : height ?? 0,
    };

    const handlePressEdit = useCallback(() => {
      onPressEdit?.(widget);
    }, [onPressEdit, widget]);

    const handlePressRemove = useCallback(() => {
      onPressRemove?.(widget);
    }, [onPressRemove, widget]);

    if (!def) return <>No renderer found for widget</>;

    return (
      <div
        data-grid={widget.layout}
        ref={ref}
        {...forwardProps}
        style={{
          ...forwardProps.style,
          // This prevents click events from firing after the widget is dragged
          ...(dragMode ? { pointerEvents: 'none' } : {}),
        }}
      >
        {def ? (
          <def.Component widget={widget} layout={layout} />
        ) : (
          'No renderer found for widget type' + widget.type
        )}
        {editMode && (
          <>
            <a
              className="absolute -bottom-2 -left-2 -right-2 -top-2 z-10 flex items-center justify-center rounded-2xl"
              style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
              onClick={handlePressEdit}
            >
              <span className="secondary-button">Edit</span>
            </a>
            <button
              onClick={handlePressRemove}
              className="absolute right-0 top-0 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-xl uppercase"
            >
              &times;
            </button>
          </>
        )}
      </div>
    );
  }
);

export default Widget;
