import { Widget as WidgetConfig } from "@/types/surface";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Widget from "./Widget";

const gridSize = 100;

const defaultSize = {
  w: 3,
  h: 2,
};

const WidgetGrid = () => {
  const [items, setItems] = useState<WidgetConfig[]>([]);
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

  const handleLayoutChange = useCallback((newLayouts: Layout[]) => {
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
        return <Widget widget={item} key={item.id} />;
      }),
      layouts: items.map((item) => item.layout),
    };
  }, [items]);

  const handlePressAddClock = useCallback(() => {
    const id = items.length.toString();
    const clockWidget: WidgetConfig = {
      id,
      type: "clock",
      layout: {
        ...defaultSize,
        x: 0,
        y: 0,
        i: id,
      },
      config: {
        type: "classic",
      },
    };
    setItems((items) => [...items, clockWidget]);
  }, [items]);

  return (
    <div ref={gridRef} className="flex h-full w-full overflow-hidden">
      <a onClick={handlePressAddClock}>Add Clock</a>
      {config ? (
        <ReactGridLayout
          className="h-full w-full"
          width={config.width}
          margin={[10, 10]}
          cols={config.columns}
          onLayoutChange={handleLayoutChange}
          rowHeight={gridSize}
          compactType={null}
          isDroppable={true}
          allowOverlap={false}
          preventCollision={false}
          layout={layouts}
        >
          {children}
        </ReactGridLayout>
      ) : null}
    </div>
  );
};

export default WidgetGrid;
