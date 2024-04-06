import { useInstalledApps } from '@/state/docket';
import { Widget as WidgetConfig, WidgetProps } from '@/widgets';
import Form, { IChangeEvent } from '@rjsf/core';
import {
  WidgetProps as FormWidgetProps,
  RJSFSchema,
  RJSFValidationError,
} from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { useCallback, useRef, useState } from 'react';
import { widgets } from '../../widgets';
import Widget from './Widget';
import { useDiaries } from '@/state/diary/diary';

const WidgetEditor = ({
  widget,
  onSubmit,
  onCancel,
}: WidgetProps & {
  onSubmit?: (widget: WidgetConfig) => void;
  onCancel?: () => void;
  params?: RJSFSchema;
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

  const handleSubmit = useCallback(() => {
    onSubmit?.({
      ...widget,
      config: formRef.current?.state.formData,
    });
  }, []);

  const handleError = useCallback((errors: RJSFValidationError[]) => {
    console.log('error', errors);
  }, []);

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center rounded-2xl bg-black bg-opacity-10">
      <div
        className="flex flex-row rounded-xl bg-white"
        style={{ width: 700, minHeight: 400, maxHeight: '80vh' }}
      >
        <div className="p-right-0 flex flex-col justify-between p-8">
          <h2 className="font-sans text-base text-xl font-bold">Edit Widget</h2>
          <div className="flex flex-1 items-center justify-center">
            <Widget
              widget={workingWidget}
              style={{
                width: '200px',
                height: '200px',
                position: 'relative',
              }}
            />
          </div>

          <div className="flex flex-row justify-start gap-2">
            <button className="secondary-button" onClick={onCancel}>
              Cancel
            </button>
            <button className="button" type="submit" onClick={handleSubmit}>
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
            uiSchema={{
              'ui:submitButtonOptions': {
                norender: true,
              },
            }}
            validator={validator}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onError={handleError}
            widgets={{ charge: ChargeInput, channel: ChannelInput }}
          ></Form>
        </div>
      </div>
    </div>
  );
};

export default WidgetEditor;

const ChargeInput = ({ value, onChange }: FormWidgetProps) => {
  const apps = useInstalledApps();
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {apps.map((a) => (
        <option key={a.desk} value={a.desk}>
          {a.title}
        </option>
      ))}
    </select>
  );
};

const ChannelInput = ({
  value,
  onChange,
  schema,
  registry,
  options,
}: FormWidgetProps) => {
  console.log(schema, registry, options);
  const diaries = useDiaries();
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {Object.keys(diaries).map((a) => (
        <option key={a} value={a}>
          {a}
        </option>
      ))}
    </select>
  );
};
