import { useMemo } from 'react';
import useTime from './useTime';
import { ClockProps } from './ClockWidget';

const colors = ['0F1F28', '366C84', '93BCCA', 'F4EFDC', 'E7DE92'];

const ColorClock = ({ size }: ClockProps) => {
  const time = useTime(100);
  const color = useMemo(() => {
    const dayProgress = time.decimal.day;
    const decimalIndex = dayProgress * colors.length;
    const nextColor = colors[Math.ceil(decimalIndex) % colors.length];
    const prevColor =
      colors[(Math.floor(decimalIndex) + colors.length) % colors.length];
    const blendAmount = decimalIndex % 1;
    return mixColors(prevColor, nextColor, blendAmount);
  }, [time]);
  return (
    <div
      style={{
        width: size[0],
        height: size[1],
        backgroundColor: color,
        borderRadius: '50%',
        aspectRatio: 0.5,
      }}
    />
  );
};

const mixColors = (color1: string, color2: string, amount: number) => {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const r = r1 * (1 - amount) + r2 * amount;
  const g = g1 * (1 - amount) + g2 * amount;
  const b = b1 * (1 - amount) + b2 * amount;
  return rgbToHex(r, g, b);
};

const hexToRgb = (hex: string) => {
  const [r, g, b] = hex.match(/.{1,2}/g)!.map((x) => parseInt(x, 16));
  return [r, g, b];
};

const rgbToHex = (r: number, g: number, b: number) => {
  return [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
};

export default ColorClock;
