import { useNotes } from '@/state/diary/diary';
import { WidgetProps } from '@/widgets';
import NoteReference from './NoteReference';

export default function NoteWidget({
  widget
}: WidgetProps<{ chFlag: string }>) {
  const dummyFlag = '~nibset-napwyn/winter-updates';

  const { letters } = useNotes(widget.config.chFlag || dummyFlag);
  const latestNote = letters.peekLargest();

  if (!latestNote) {
    return null;
  }

  return (
    <NoteReference
      chFlag={widget.config.chFlag || dummyFlag}
      outline={latestNote[1]}
      nest={`diary/${widget.config.chFlag || dummyFlag}`}
      id={latestNote[0].toString()}
    />
  );
}
