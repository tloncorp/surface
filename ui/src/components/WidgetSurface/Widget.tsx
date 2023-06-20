import { Widget as WidgetConfig, WidgetProps, widgets } from '@/widgets';
import React, { HTMLProps, PropsWithChildren, useCallback } from 'react';
import XIcon from '../icons/XIcon';
import MenuIcon from '../icons/MenuIcon';
import cn from 'classnames'

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
        className={cn(forwardProps.className, 'group')}
      >
        {def ? (
          <def.Component
            widget={widget}
            layout={layout}
            onPressEdit={onPressEdit}
          />
        ) : (
          `No renderer found for widget type: '${widget.type}'.`
        )}
        <div className="absolute right-4 top-4 flex flex-row gap-1 hidden group-hover:flex">
          <button
            className="flex h-6 w-6 items-center justify-center rounded bg-black bg-opacity-10 text-white backdrop-blur"
            onClick={handlePressEdit}
          >
            <MenuIcon className="h-4 w-4" />
          </button>
          <button
            className="flex h-6 w-6 items-center justify-center rounded bg-black bg-opacity-10 text-white backdrop-blur"
            onClick={handlePressRemove}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }
);

export default Widget;
