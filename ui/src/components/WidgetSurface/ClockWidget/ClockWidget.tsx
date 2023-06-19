import { useEffect, useRef, useState } from 'react';
import ClassicClock from './ClassicClock';
import ColorClock from './ColorClock';
import SeasonClock from './SeasonClock';
import TextClock from './TextClock';
import { getQueryParam } from '@/logic/utils';
import { useEditWidget, usePaneFromWidget, useSurface } from '@/state/surface';
import { WidgetProps } from '@/widgets';
import WidgetEditor from '../WidgetEditor';
import { RJSFSchema } from '@rjsf/utils';

const ClockWidget = ({
  widget,
  editingWidget,
  setEditingWidget,
  layout
}: WidgetProps<{
  type: string;
}>) => {
  const surfaceId = getQueryParam('surface') ?? 'default';
  const surface = useSurface(surfaceId);
  const pane = usePaneFromWidget(surfaceId, widget.id);
  const handleEditWidget = useEditWidget(
    surfaceId,
    widget.id,
    setEditingWidget
  );

  useEffect(() => {
    if (!widget.config.type && setEditingWidget) {
      setEditingWidget(true);
    }
  }, [widget.config.type]);

  const params: RJSFSchema = {
    properties: {
      type: {
        type: 'string',
        title: 'Clock Type',
        oneOf: [
          {
            const: 'classic',
            title: 'Classic'
          },
          {
            const: 'seasons',
            title: 'Seasons'
          },
          {
            const: 'color',
            title: 'Color'
          },
          {
            const: 'text',
            title: 'Text'
          }
        ]
      }
    },
    allOf: [
      {
        if: {
          properties: {
            type: {
              const: 'classic'
            }
          }
        },
        then: {
          properties: {
            borderColor: {
              type: 'string'
            }
          }
        }
      }
    ]
  };

  if (!pane || !surface) {
    return 'Loading...';
  }

  if (editingWidget) {
    return (
      <WidgetEditor
        widget={widget}
        onSubmit={handleEditWidget}
        onCancel={() =>
          setEditingWidget && widget.config.type
            ? setEditingWidget(false)
            : undefined
        }
        params={params}
      />
    );
  }

  if (!widget.config.type || !layout) {
    return 'Loading...';
  }

  const Component = {
    classic: ClassicClock,
    color: ColorClock,
    seasons: SeasonClock,
    text: TextClock
  }[widget.config.type];

  return <Component size={[layout.w, layout.h]} />;
};

export default ClockWidget;
