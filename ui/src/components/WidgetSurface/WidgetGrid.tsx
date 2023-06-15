import { useSurfaceState } from "@/state/surface";
import { WidgetPane } from "@/types/surface";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Widget from "./Widget";
import { WidgetMenu } from "./WidgetMenu";

const gridSize = 113;
const gutter = 24;

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
    paddingX: number;
    paddingY: number;
    rows: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const columns = Math.floor(rect.width / (gridSize + gutter));
    const rows = Math.floor(rect.height / (gridSize + gutter));
    const width = columns * gridSize + (columns - 1) * gutter;
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

  const { children, layouts } = useMemo(() => {
    return {
      children: widgets.map((item, i) => {
        return <Widget widget={item} key={item.id} />;
      }),
      layouts: widgets.map((item) => item.layout),
    };
  }, [widgets]);

  return (
    <div
      ref={gridRef}
      className="flex h-full w-full overflow-hidden"
      style={{ padding: `${config?.paddingY}px ${config?.paddingX}px` }}
    >
      {config ? (
        <ReactGridLayout
          className="h-full w-full"
          width={config.width}
          margin={[gutter, gutter]}
          containerPadding={[0, 0]}
          cols={config.columns}
          onLayoutChange={handleLayoutChange}
          rowHeight={gridSize}
          maxRows={config.rows}
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
