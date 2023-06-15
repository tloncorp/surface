import { ChargeWithDesk, useInstalledApps } from '@/state/docket';
import { WidgetProps } from '@/widgets';
import { Tile } from './Tile';

export default function AppTileWidget({
  widget
}: WidgetProps<{ charge: ChargeWithDesk; desk: string }>) {
  const apps = useInstalledApps();

  if (!apps) {
    return null;
  }

  const charge = apps[0];

  if (!charge) {
    return null;
  }

  return (
    <Tile
      charge={widget.config.charge ?? charge}
      desk={widget.config.desk ?? charge.desk}
    />
  );
}
