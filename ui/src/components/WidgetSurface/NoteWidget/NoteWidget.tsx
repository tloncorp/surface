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
    return (
      <div
        className={`flex h-full w-full items-center justify-center rounded-2xl border-2 bg-white`}
      >
        <button className="button">Select Post</button>
      </div>
    );
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
