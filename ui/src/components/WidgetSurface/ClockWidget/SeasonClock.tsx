import useTime from "./useTime";
import seasons from "./seasons";
import { useMemo } from "react";

const SeasonClock = () => {
  const time = useTime(100);
  const season = useMemo(() => {
    for (const period of seasons) {
      for (const season of period.seasons) {
        const start = new Date(
          season.startDate + " " + time.date.getFullYear()
        );
        const end =
          new Date(season.endDate + " " + time.date.getFullYear()).getTime() +
          (86400000 - 1);
        if (start < time.date && time.date.getTime() < end) {
          return season.name.en;
        }
      }
    }
    console.log("Failed to find season");
  }, [time]);
  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        width: 200,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed #CCC",
        borderRadius: 10,
        fontSize: 14,
        color: "#AAA",
        padding: 20,
      }}
    >
      {season}
    </div>
  );
};

export default SeasonClock;
