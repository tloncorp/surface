import { useCallback } from "react";
import { WidgetConfig } from "./Widget";

const widgets = [
  {
    name: "Clock",
    color: "0x0",
  },
];

const AddWidgetModal = ({
  isOpen,
  onWidgetSelected,
  onClose,
}: {
  isOpen: boolean;
  onWidgetSelected: (widget: WidgetConfig) => void;
  onClose: () => void;
}) => {
  const handleBackdropClicked = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  <div
    className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center p-4"
    onClick={handleBackdropClicked}
  >
    <ul className="w-[300px] rounded-lg bg-white p-2 shadow-xl">
      {widgets.map((widget) => {
        return (
          <div
            className="flex cursor-pointer items-center gap-3 p-2"
            key={widget.name}
            onClick={() =>
              onWidgetSelected({
                name: widget.name,
                color: widget.color,
              })
            }
          >
            <div
              style={{
                backgroundColor: normalizeUrbitColor(widget.color),
              }}
              className="h-6 w-6 rounded"
            ></div>
            {widget.name}
          </div>
        );
      })}
    </ul>
  </div>;
};

export default AddWidgetModal;
