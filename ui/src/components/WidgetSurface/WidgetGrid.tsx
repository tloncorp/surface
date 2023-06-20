import { useSurfaceState } from '@/state/surface';
import { WidgetPane } from '@/types/surface';
import { Widget as WidgetConfig } from '@/widgets';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ReactGridLayout, { ItemCallback, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Widget from './Widget';
import WidgetEditor from './WidgetEditor';

const gridSize = 80;
const gutterSize = 16;

interface WidgetGridProps {
  id: string;
  pane: WidgetPane;
}

const WidgetGrid = ({ id, pane }: WidgetGridProps) => {
  const [editorTarget, setEditorTarget] = useState<WidgetConfig | null>(null);
  const [dragTarget, setDragTarget] = useState<WidgetConfig | null>(null);
  const { widgets } = pane;
  const { updatePane } = useSurfaceState();
  const gridRef = useRef<HTMLDivElement>(null);

  const [config, setConfig] = useState<{
    columns: number;
    width: number;
    paddingX: number;
    paddingY: number;
    rows: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const columns = Math.floor(rect.width / (gridSize + gutterSize));
    const rows = Math.floor(rect.height / (gridSize + gutterSize));
    const width = columns * gridSize + (columns - 1) * gutterSize;
    const paddingX = (rect.width - width) / 2;
    const paddingY = 48;
    setConfig({
      columns,
      rows,
      width,
      paddingX,
      paddingY,
    });
  }, []);

  const handleLayoutChange = useCallback(
    (newLayouts: Layout[]) => {
      updatePane(id, {
        ...pane,
        widgets: widgets.map((item, i) => {
          return {
            ...item,
            layout: { ...newLayouts[i] },
          };
        }),
      });
    },
    [id, pane, widgets]
  );

  const handlePressEditWidget = useCallback((widget: WidgetConfig) => {
    setEditorTarget(widget);
  }, []);

  const handleWidgetEdited = useCallback(
    (updatedWidget: WidgetConfig) => {
      const newWidgets = widgets.map((item) => {
        return item.id === updatedWidget?.id ? updatedWidget : item;
      });
      setEditorTarget(null);
      updatePane(id, {
        ...pane,
        widgets: newWidgets,
      });
    },
    [widgets]
  );

  const handlePressRemoveWidget = useCallback(
    (widget: WidgetConfig) => {
      updatePane(id, {
        ...pane,
        widgets: widgets.filter((item) => item.id !== widget.id),
      });
    },
    [widgets]
  );

  const { children, layouts } = useMemo(() => {
    return {
      children: widgets.map((item, i) => {
        return (
          <Widget
            widget={item}
            key={item.id}
            dragMode={item.id === dragTarget?.id}
            onPressRemove={handlePressRemoveWidget}
            onPressEdit={handlePressEditWidget}
          />
        );
      }),
      layouts: widgets.map((item) => item.layout),
    };
  }, [widgets, dragTarget]);

  const handleCancelEditingWidget = useCallback(() => {
    setEditorTarget(null);
  }, []);

  // React grid layout doesn't always fire `onDragStop` after `onDragStart`,
  // so we need to manually bind listeners to track the drag state.
  // See https://github.com/react-grid-layout/react-grid-layout/issues/1341
  const handleDragStart: ItemCallback = useCallback(
    (layouts, targetLayout, oldLayout, newLayout, e) => {
      const origin = { x: e.pageX, y: e.pageY };
      let dragStarted = false;

      const handleMouseMove = (e: MouseEvent) => {
        if (!dragStarted) {
          const distance = Math.sqrt(
            Math.pow(e.pageX - origin.x, 2) + Math.pow(e.pageY - origin.y, 2)
          );
          if (distance > 0) {
            dragStarted = true;
            const draggedWidget = widgets.find((w) => w.id === targetLayout.i);
            setDragTarget(draggedWidget ?? null);
          }
        }
      };
      const handleMouseUp = () => {
        setDragTarget(null);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [widgets]
  );

  return (
    <div ref={gridRef} className="h-full w-full overflow-auto p-2">
      <div className="relative">
        <GridBackground
          subdivisions={1}
          cellSize={gridSize + gutterSize}
          offset={{ x: -gutterSize / 2, y: -gutterSize / 2 }}
        />
        {config ? (
          <ReactGridLayout
            className="h-full w-full"
            width={config.width}
            margin={[gutterSize, gutterSize]}
            containerPadding={[0, 0]}
            cols={config.columns}
            onLayoutChange={handleLayoutChange}
            rowHeight={gridSize}
            compactType={null}
            isDroppable={true}
            allowOverlap={false}
            preventCollision={true}
            onDragStart={handleDragStart}
            layout={layouts}
          >
            {children}
          </ReactGridLayout>
        ) : null}
      </div>
      {editorTarget && (
        <WidgetEditor
          widget={editorTarget}
          onSubmit={handleWidgetEdited}
          onCancel={handleCancelEditingWidget}
        />
      )}
    </div>
  );
};

export default WidgetGrid;

const GridBackground = ({
  cellSize,
  subdivisions = 0,
  offset = { x: 0, y: 0 },
}: {
  subdivisions?: number;
  cellSize: number;
  offset: {
    x: number;
    y: number;
  };
}) => {
  const size = cellSize / Math.pow(2, subdivisions);
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundPosition: `-${offset.x}px -${offset.y}px`,
        backgroundSize: `${size}px ${size}px`,
        backgroundImage: `radial-gradient(circle at 50%, #CCC, #CCC, 1.5px, transparent 3.1%)`,
      }}
    ></div>
  );
};
