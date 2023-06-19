import React, { useEffect, useRef } from 'react';
import useTime from './useTime';

const borderTypes = [
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
] as const;

type BorderType = (typeof borderTypes)[number];

export interface ClassicClockConfig {
  backgroundColor: string;
  borderColor: string;
  borderType: BorderType;
  borderWidth: number;
  borderRadius: number;
  blur: number;
  hourHand: {
    enabled: boolean;
    width: number;
    length: number;
    color: string;
  };
  minuteHand: {
    enabled: boolean;
    width: number;
    length: number;
    color: string;
  };
  secondHand: {
    enabled: boolean;
    width: number;
    length: number;
    color: string;
  };
}

const Clock: React.FC<{
  size: [number, number];
  config: ClassicClockConfig;
}> = ({ size, config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const time = useTime(1, 1000);
  const renderSize = Math.min(size[0], size[1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the clock circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Hour hand
    if (config.hourHand.enabled) {
      const [hourHandX, hourHandY] = circlePoint(
        centerX,
        centerY,
        config.hourHand.length * radius,
        time.angles.hour
      );
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineTo(hourHandX, hourHandY);
      context.strokeStyle = config.hourHand.color;
      context.lineWidth = config.hourHand.width;
      context.stroke();
    }

    // Minute hand
    if (config.minuteHand.enabled) {
      const [minuteHandX, minuteHandY] = circlePoint(
        centerX,
        centerY,
        config.minuteHand.length * radius,
        time.angles.minute
      );
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineTo(minuteHandX, minuteHandY);
      context.strokeStyle = config.minuteHand.color;
      context.lineWidth = config.minuteHand.width;
      context.stroke();
    }

    // Second hand
    if (config.secondHand.enabled) {
      const [secondHandX, secondHandY] = circlePoint(
        centerX,
        centerY,
        config.secondHand.length * radius,
        time.angles.second
      );
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineTo(secondHandX, secondHandY);
      context.strokeStyle = config.secondHand.color;
      context.lineWidth = config.secondHand.width;
      context.stroke();
    }
  }, [time, config, renderSize]);

  return (
    <canvas
      ref={canvasRef}
      width={renderSize * window.devicePixelRatio}
      height={renderSize * window.devicePixelRatio}
      style={{
        width: renderSize,
        height: renderSize,
        backgroundColor: config.backgroundColor,
        borderRadius: config.borderRadius,
        filter: `blur(${config.blur}px)`,
        borderWidth: `${config.borderWidth}px`,
        borderStyle: config.borderType,
        borderColor: config.borderColor,
      }}
    />
  );
};

export default Clock;

function circlePoint(
  x: number,
  y: number,
  radius: number,
  angle: number
): [number, number] {
  return [
    x + radius * Math.cos(angle - Math.PI / 2),
    y + radius * Math.sin(angle - Math.PI / 2),
  ];
}
