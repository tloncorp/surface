import { Widget, WidgetProps } from "@/widgets";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import { FormEvent, useCallback } from "react";
import { widgets } from "../../widgets";
import { UiSchema } from "@rjsf/utils";

const WidgetEditor = ({
  widget,
  onSubmit,
  onCancel,
}: WidgetProps & {
  onSubmit?: (widget: Widget) => void;
  onCancel?: () => void;
}) => {
  const definition = widgets[widget.type];

  const handleChange = useCallback((e: FormEvent<any>) => {
    console.log("change", e);
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
    <div className="fixed left-10 top-10 h-full w-full bg-white">
      <Form
        formData={widget.config}
        schema={definition.params}
        uiSchema={uiSchema}
        validator={validator}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onError={handleError}
      >
        <button onClick={onCancel}>Cancel</button>
        <button type="submit">Done</button>
      </Form>
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
};

export default WidgetEditor;
