import React, {
  DragEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactGridLayout, { DragOverEvent, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import WidgetList from "./WidgetList";
import Widget, { WidgetConfig } from "./widgets/Widget";

const gridSize = 100;

const defaultSize = {
  w: 3,
  h: 2,
};

interface GridItemConfig {
  layout: Layout;
  config: WidgetConfig;
}

const WidgetGrid = () => {
  const [items, setItems] = useState<GridItemConfig[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  const [config, setConfig] = useState<{
    columns: number;
    width: number;
    padding: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const columns = Math.floor(rect.width / gridSize);
    const width = columns * gridSize;
    const padding = (rect.width - width) / 2;
    setConfig({
      columns,
      width,
      padding,
    });
  }, []);

  const handleDrop = useCallback(
    (gridLayouts: Layout[], itemLayout: Layout, event: Event) => {
      // react-grid-layout typing is inaccurate
      const dragEvent = event as unknown as DragEvent;
      const rawData = dragEvent.dataTransfer.getData("text/plain");
      const config = JSON.parse(rawData) as WidgetConfig;
      setItems((items) => [
        ...items,
        {
          layout: {
            ...defaultSize,
            ...itemLayout,
            i: items.length.toString(),
          },
          config,
        },
      ]);
    },
    []
  );

  const isResizing = useRef(false);

  const handleResizeStart = useCallback(() => {
    isResizing.current = true;
  }, []);

  const handleResizeStop = useCallback(() => {
    isResizing.current = false;
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    return { ...defaultSize };
  }, []);

  const handleLayoutChange = useCallback((newLayouts: Layout[]) => {
    if (isResizing.current) return;
    setItems((items) => {
      const newItems = items.map((item, i) => {
        return {
          ...item,
          layout: { ...newLayouts[i] },
        };
      });
      return newItems;
    });
  }, []);

  const { children, layouts } = useMemo(() => {
    return {
      children: items.map((item, i) => {
        return <GridItem config={item} key={i} />;
      }),
      layouts: items.map((item) => item.layout),
    };
  }, [items]);

  return (
    <div
      ref={gridRef}
      style={{
        display: "flex",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        flex: 1,
      }}
    >
      {config ? (
        <ReactGridLayout
          style={{
            height: "100%",
            width: "100%",
          }}
          onDropDragOver={handleDragOver}
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
          onDrop={handleDrop}
          width={config.width}
          margin={[10, 10]}
          cols={config.columns}
          onLayoutChange={handleLayoutChange}
          rowHeight={gridSize}
          compactType={null}
          isDroppable={true}
          allowOverlap={true}
          preventCollision={false}
          layout={layouts}
        >
          {children}
        </ReactGridLayout>
      ) : null}
      <WidgetList />
    </div>
  );
};

export default WidgetGrid;

const GridItem = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    React.HTMLProps<HTMLDivElement> & {
      config: GridItemConfig;
      onPressAdd?: () => void;
      onPressRemove?: () => void;
    }
  >
>(
  (
    { config, style, className, onMouseDown, onMouseUp, onTouchEnd, children },
    ref
  ) => {
    return (
      <div
        data-grid={config.layout}
        ref={ref}
        style={style}
        className={className}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
      >
        <Widget config={config.config} />
        {children}
      </div>
    );
  }
);
