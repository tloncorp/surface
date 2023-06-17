import { Widget as WidgetConfig, WidgetProps } from "@/widgets";
import Form, { IChangeEvent } from "@rjsf/core";
import { RJSFValidationError, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { useCallback, useRef, useState } from "react";
import { widgets } from "../../widgets";
import Widget from "./Widget";

const WidgetEditor = ({
  widget,
  onSubmit,
  onCancel,
}: WidgetProps & {
  onSubmit?: (widget: WidgetConfig) => void;
  onCancel?: () => void;
}) => {
  const formRef = useRef<Form>(null);
  const definition = widgets[widget.type];
  const [workingWidget, setWorkingWidget] = useState(widget);

  const handleChange = useCallback((e: IChangeEvent) => {
    setWorkingWidget({
      ...workingWidget,
      config: e.formData,
    });
  }, []);

  const handleSubmit = useCallback((e: IChangeEvent) => {
    onSubmit?.({
      ...widget,
      config: e.formData,
    });
  }, []);

  const handleError = useCallback((errors: RJSFValidationError[]) => {
    console.log("error", errors);
  }, []);

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center rounded-2xl">
      <div
        className="flex flex-row rounded-xl bg-white"
        style={{ width: 700, minHeight: 400, maxHeight: "80vh" }}
      >
        <div className="p-right-0 flex flex-col justify-between p-8">
          <h2 className="font-sans text-base text-xl font-bold">Edit Widget</h2>
          <div className="flex flex-1 items-center justify-center">
            <Widget
              widget={workingWidget}
              style={{
                width: "200px",
                height: "200px",
                position: "relative",
              }}
            />
          </div>

          <div className="flex flex-row justify-start gap-2">
            <button className="secondary-button" onClick={onCancel}>
              Cancel
            </button>
            <button className="button" type="submit">
              Done
            </button>
          </div>
        </div>
        <div className="p-left-0 flex flex-1 overflow-auto p-8">
          <Form
            ref={formRef}
            className="rjsf flex flex-1 flex-col justify-between"
            noValidate={true}
            formData={workingWidget.config}
            schema={definition.params}
            uiSchema={uiSchema}
            validator={validator}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onError={handleError}
          ></Form>
        </div>
      </div>
    </div>
  );
};

const uiSchema: UiSchema = {
  "ui:submitButtonOptions": {
    norender: true,
  },
};

export default WidgetEditor;
