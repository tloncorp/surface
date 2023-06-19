import { ChargeWithDesk, useInstalledApps } from '@/state/docket';
import { WidgetProps } from '@/widgets';
import WidgetEditor from '@/components/WidgetSurface/WidgetEditor';
import { getQueryParam } from '@/logic/utils';
import { Tile } from './Tile';
import {
  useEditWidget,
  usePaneFromWidget,
  useSurface,
} from '@/state/surface';
import { useEffect, useMemo, useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';

export default function AppTileWidget({
  widget,
  editingWidget,
  setEditingWidget
}: WidgetProps<{ desk: string }>) {
  const [charge, setCharge] = useState<ChargeWithDesk | null>(null);
  const apps = useInstalledApps();
  const surfaceId = getQueryParam('surface') ?? 'default';
  const surface = useSurface(surfaceId);
  const pane = usePaneFromWidget(surfaceId, widget.id);
  const handleEditWidget = useEditWidget(
    surfaceId,
    widget.id,
    setEditingWidget
  );

  useEffect(() => {
    if (!widget.config.desk && setEditingWidget) {
      setEditingWidget(true);
    }
  }, [widget.config.desk]);

  useEffect(() => {
    if (apps && widget.config.desk) {
      const charge = apps.find(c => c.desk === widget.config.desk);
      if (!charge) {
        return;
      }
      setCharge(charge);
    }
  }, [apps, widget.config.desk]);

  const params: RJSFSchema = useMemo(() => {
    return {
      properties: {
        desk: {
          type: 'string',
          title: 'App',
          oneOf: apps.map(app => ({
            const: app.desk,
            title: app.title
          }))
        }
      }
    };
  }, [apps]);

  if (!pane || !surface) {
    return "Loading...";
  }

  if (editingWidget) {
    return (
      <WidgetEditor
        widget={widget}
        onSubmit={handleEditWidget}
        showPreview={false}
        onCancel={
          setEditingWidget && charge ? () => setEditingWidget(false) : undefined
        }
        params={params}
      />
    );
  }

  if (!charge) {
    return "Loading...";
  }

  return <Tile charge={charge} desk={widget.config.desk} />;
}
