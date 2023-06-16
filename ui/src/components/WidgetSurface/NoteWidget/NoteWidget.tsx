import { useDiaries, useNotes } from '@/state/diary/diary';
import { WidgetProps } from '@/widgets';
import { useEffect, useMemo } from 'react';
import NoteReference from './NoteReference';
import { getQueryParam } from '@/logic/utils';
import { useEditWidget, usePaneFromWidget, useSurface } from '@/state/surface';
import WidgetEditor from '../WidgetEditor';
import { RJSFSchema } from '@rjsf/utils';

export default function NoteWidget({
  widget,
  editingWidget,
  setEditingWidget
}: WidgetProps<{ chFlag: string }>) {
  const surfaceId = getQueryParam('surface') ?? 'default';
  const surface = useSurface(surfaceId);
  const pane = usePaneFromWidget(surfaceId, widget.id);
  const handleEditWidget = useEditWidget(
    surfaceId,
    widget.id,
    setEditingWidget
  );
  const { letters } = useNotes(widget.config.chFlag ?? '');
  const latestNote = letters.peekLargest();
  const diaries = useDiaries();
  const diaryFlags = Object.keys(diaries);

  useEffect(() => {
    if (!widget.config.chFlag && setEditingWidget) {
      setEditingWidget(true);
    }
  }, [widget.config.chFlag]);

  const params: RJSFSchema = useMemo(() => {
    return {
      properties: {
        chFlag: {
          title: 'Channel',
          type: 'string',
          oneOf: diaryFlags.map(flag => ({
            title: flag,
            const: flag
          }))
        }
      }
    };
  }, [diaryFlags]);

  if (!pane || !surface) {
    return null;
  }

  if (editingWidget) {
    return (
      <WidgetEditor
        widget={widget}
        onSubmit={handleEditWidget}
        onCancel={() =>
          setEditingWidget && latestNote ? setEditingWidget(false) : undefined
        }
        params={params}
      />
    );
  }

  if (!latestNote) {
    return 'Loading...';
  }

  return (
    <NoteReference
      chFlag={widget.config.chFlag}
      outline={latestNote[1]}
      nest={`diary/${widget.config.chFlag}`}
      id={latestNote[0].toString()}
    />
  );
}
