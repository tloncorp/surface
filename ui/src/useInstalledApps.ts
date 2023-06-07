import { ChargeUpdateInitial } from "@urbit/api/dist/api";
import urbit from "./urbit";
import { useQuery } from "react-query";
import { useMemo } from "react";

export const getInstalledApps = async () => {
  return await urbit.scry<ChargeUpdateInitial>({
    app: "docket",
    path: "/charges",
  });
};

const filteredApps = ["garden", "surface", "landscape"];

const useInstalledApps = () => {
  const { data } = useQuery("apps", getInstalledApps);
  return useMemo(
    () =>
      Object.entries(data?.initial ?? {})
        .filter(([slug]) => !filteredApps.includes(slug))
        .map(([, app]) => app),
    [data]
  );
};

export default useInstalledApps;
