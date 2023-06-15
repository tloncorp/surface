import { Widget as WidgetConfig, WidgetProps } from "@/widgets";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import { FormEvent, useCallback, useState } from "react";
import { widgets } from "../../widgets";
import { UiSchema } from "@rjsf/utils";
import Widget from "./Widget";

const WidgetEditor = ({
  widget,
  onSubmit,
  onCancel,
}: WidgetProps & {
  onSubmit?: (widget: WidgetConfig) => void;
  onCancel?: () => void;
}) => {
  const definition = widgets[widget.type];
  const [workingWidget, setWorkingWidget] = useState(widget);

  const handleChange = useCallback((e: FormEvent<any>) => {
    setWorkingWidget({
      ...workingWidget,
      config: e.formData,
    });
  }, []);

  const handleSubmit = useCallback((e: { formData: any }) => {
    onSubmit?.({
      ...widget,
      config: e.formData,
    });
  }, []);

  const handleError = useCallback((e: FormEvent) => {
    console.log("error", e);
  }, []);

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center rounded-2xl">
      <div
        className="flex flex-col rounded-xl bg-white p-8"
        style={{ width: 700, minHeight: 400, maxHeight: "80vh" }}
      >
        <h2 className="font-sans text-base text-xl font-bold">Edit Widget</h2>
        <div className="flex flex-1 flex-row gap-4">
          <div className="flex flex-col">
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
          </div>
          <div className="flex flex-1">
            <Form
              className="rjsf flex flex-1 flex-col justify-between"
              noValidate={true}
              formData={workingWidget.config}
              schema={definition.params}
              uiSchema={uiSchema}
              validator={validator}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onError={handleError}
            >
              <div className="flex flex-row justify-end gap-2">
                <button className="secondary-button" onClick={onCancel}>
                  Cancel
                </button>
                <button className="button" type="submit">
                  Done
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const uiSchema: UiSchema = {
  "ui:submitButtonOptions": {
    props: {
      disabled: false,
      className: "btn btn-info",
    },
    norender: false,
    submitText: "Done",
  },
  "ui:classNames": "flex flex-1 flex-col justify-between",
};

export default WidgetEditor;
