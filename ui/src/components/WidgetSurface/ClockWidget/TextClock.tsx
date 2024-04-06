import { ClockProps } from './ClockWidget';
import useTime from './useTime';

const TextClock = ({ size }: ClockProps) => {
  const time = useTime(100);
  return (
    <div
      style={{
        width: size[0],
        height: size[1],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        color: '#CCC',
        borderRadius: 16,
      }}
    >
      {time.date.toLocaleString().split(',')[0]}

      <br />
      {time.date.toLocaleString().split(',')[1]}
    </div>
  );
};

export default TextClock;
