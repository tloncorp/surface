import { ChargeWithDesk, useInstalledApps } from '@/state/docket';
import { WidgetProps } from '@/widgets';
import { useEffect, useMemo, useState } from 'react';
import { Tile } from './Tile';

export default function AppTileWidget({
  widget,
}: WidgetProps<{ desk: string }>) {
  const apps = useInstalledApps();

  const charge = useMemo(() => {
    if (!apps) {
      return null;
    }
    return apps.find((c) => c.desk === widget.config.desk) ?? apps[0];
  }, [apps, widget.config.desk]);

  if (!charge) {
    return null;
  }

  return <Tile charge={charge} desk={widget.config.desk} />;
}
