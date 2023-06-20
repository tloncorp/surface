import { useNotes } from '@/state/diary/diary';
import { WidgetProps } from '@/widgets';
import NoteReference from './NoteReference';
import { useCallback } from 'react';

export default function NoteWidget({
  widget,
  onPressEdit
}: WidgetProps<{ chFlag: string }>) {
  const { letters } = useNotes(widget.config.chFlag ?? '');
  const latestNote = letters.peekLargest();

  const handlePressEdit = useCallback(() => {
    onPressEdit?.(widget);
  }, [])

  if (!latestNote) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center rounded-2xl border-2 bg-white`}
      >
        <button className="button" onClick={handlePressEdit}>Select Post</button>
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
