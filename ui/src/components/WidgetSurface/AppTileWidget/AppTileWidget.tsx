import { ChargeWithDesk, useInstalledApps } from '@/state/docket';
import { WidgetProps } from '@/widgets';
import { useEffect, useState } from 'react';
import { Tile } from './Tile';

export default function AppTileWidget({
  widget,
}: WidgetProps<{ desk: string }>) {
  const [charge, setCharge] = useState<ChargeWithDesk | null>(null);
  const apps = useInstalledApps();

  useEffect(() => {
    if (apps && widget.config.desk) {
      const charge = apps.find((c) => c.desk === widget.config.desk);
      if (!charge) {
        return;
      }
      setCharge(charge);
    }
  }, [apps, widget.config.desk]);

  if (!charge) {
    return <button>Configure</button>;
  }

  return <Tile charge={charge} desk={widget.config.desk} />;
}
