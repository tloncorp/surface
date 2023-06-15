import { useEffect, useMemo, useState } from "react";

const useTime = (timeScale = 1, updateInterval = 1000) => {
  const mountTime = useMemo(() => new Date(), []);
  const [time, setTime] = useState(() => calculateTime(mountTime));

  useEffect(() => {
    const update = () => {
      const workingTime = new Date(
        mountTime.getTime() +
          (new Date().getTime() - mountTime.getTime()) * timeScale
      );
      setTime(calculateTime(workingTime));
    };
    const interval = setInterval(update, updateInterval);
    return () => clearInterval(interval);
  }, [timeScale, updateInterval, mountTime]);

  return time;
};

export default useTime;

const calculateTime = (now: Date) => {
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const offset = now.getTime() - startOfDay.getTime();
  const dayElapsed = offset / (1000 * 60 * 60 * 24);
  const startOfMinute = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes()
  );
  const minuteOffset = now.getTime() - startOfMinute.getTime();
  const minuteElapsed = minuteOffset / (1000 * 60);
  const startOfHour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours()
  );
  const hourOffset = now.getTime() - startOfHour.getTime();
  const hourElapsed = hourOffset / (1000 * 60 * 60);
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  );
  const weekElapsed =
    (now.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24 * 7);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthElapsed =
    (now.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24 * 30);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const yearElapsed =
    (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24 * 365);

  const hourAngle = ((hours % 12) + minutes / 60) * 30 * (Math.PI / 180);
  const minuteAngle = (minutes + seconds / 60) * 6 * (Math.PI / 180);
  const secondAngle =
    (seconds + now.getMilliseconds() / 1000) * 6 * (Math.PI / 180);
  return {
    date: now,
    basic: {
      hours,
      minutes,
      seconds,
    },
    decimal: {
      hour: hourElapsed,
      minute: minuteElapsed,
      day: dayElapsed,
      week: weekElapsed,
      month: monthElapsed,
      year: yearElapsed,
    },
    angles: {
      hour: hourAngle,
      minute: minuteAngle,
      second: secondAngle,
    },
  };
};

export type TimeState = ReturnType<typeof calculateTime>;
