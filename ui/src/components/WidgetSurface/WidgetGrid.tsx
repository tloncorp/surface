import { WidgetPane } from "@/types/surface";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Widget from "./Widget";
import { WidgetMenu } from "./WidgetMenu";
import { useSurfaceState } from "@/state/surface";

const gridSize = 100;

interface WidgetGridProps {
  id: string;
  pane: WidgetPane;
}

const WidgetGrid = ({ id, pane }: WidgetGridProps) => {
  const { widgets } = pane;
  const { updatePane } = useSurfaceState();
  const gridRef = useRef<HTMLDivElement>(null);

  console.log(widgets);

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

  const { children, layouts } = useMemo(() => {
    return {
      children: widgets.map((item, i) => {
        return <Widget widget={item} key={item.id} />;
      }),
      layouts: widgets.map((item) => item.layout),
    };
  }, [widgets]);

  return (
    <div ref={gridRef} className=" flex h-full w-full overflow-hidden">
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
      <footer className="fixed bottom-0 left-0 flex w-full justify-center p-2">
        <div className="flex items-center justify-center space-x-2">
          <button className="nav-button default-focus">Edit Tab</button>
          <WidgetMenu id={id} pane={pane} />
        </div>
      </footer>
    </div>
  );
};

export default WidgetGrid;
