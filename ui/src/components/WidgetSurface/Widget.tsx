import { WidgetProps, Widget as WidgetConfig } from '@/widgets';
import React, {
  HTMLProps,
  PropsWithChildren,
  useCallback,
  useState
} from 'react';
import { widgets } from '@/widgets';
import WidgetEditor from './WidgetEditor';

const Widget = React.forwardRef<
  HTMLDivElement,
  // We need to forward a number of props to the underlying div for
  // compatibility with `react-grid-layout`.
  // More info: https://github.com/react-grid-layout/react-grid-layout#custom-child-components-and-draggable-handles
  WidgetProps & {
    editMode?: boolean;
    onPressRemove?: (widget: WidgetConfig<any>) => void;
  } & PropsWithChildren<HTMLProps<HTMLDivElement>>
>(({ widget, editMode, onPressRemove, ...forwardProps }, ref) => {
  const def = widgets[widget.type];
  const [editingWidget, setEditingWidget] = useState(false);

  // All values in `react-grid-layout` `Layout`s are specified in grid units, and
  // need to be translated to pixel dimensions to be useful. It's kind of a pain
  // to do the translation, so for now we're just grabbing them out of the style
  // attribute it's already calculating.
  // TODO: Something better than this
  const { width, height } = forwardProps.style ?? { width: 0, height: 0 };
  const layout = {
    ...widget.layout,
    w: typeof width === 'string' ? parseInt(width) : width ?? 0,
    h: typeof height === 'string' ? parseInt(height) : height ?? 0
  };

  const handlePressRemove = useCallback(() => {
    onPressRemove?.(widget);
  }, [onPressRemove, widget]);

  if (!def) return <>No renderer found for widget</>;

  return (
    <div
      data-grid={widget.layout}
      ref={ref}
      className="group"
      {...forwardProps}
      style={{ ...forwardProps.style }}
    >
      {def ? (
        <def.Component
          widget={widget}
          editingWidget={editingWidget}
          setEditingWidget={setEditingWidget}
          // the clock widget needs these layout values
          layout={layout}
        />
      ) : (
        'No renderer found for widget type' + widget.type
      )}
      {editMode && !editingWidget && (
        <>
          <a
            className="absolute -bottom-2 -left-2 -right-2 -top-2 z-10 flex items-center justify-center rounded-2xl"
            style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            onClick={() => setEditingWidget(true)}
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
});

export default Widget;
