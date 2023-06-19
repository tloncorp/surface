import { useNotes } from '@/state/diary/diary';
import { WidgetProps } from '@/widgets';
import NoteReference from './NoteReference';

export default function NoteWidget({
  widget,
  editingWidget,
  setEditingWidget,
}: WidgetProps<{ chFlag: string }>) {
  const { letters } = useNotes(widget.config.chFlag ?? '');
  const latestNote = letters.peekLargest();

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
