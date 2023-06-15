import React, { ReactNode, useCallback } from 'react';
import { ChargeWithDesk, useCharge } from '../state/docket';
import { getAppHref } from '@/logic/utils';
import { useSurfaceState } from '@/state/surface';

interface DeskLinkProps extends React.AnchorHTMLAttributes<any> {
  desk: string;
  to?: string;
  children?: ReactNode;
  className?: string;
}

export function DeskLink({
  children,
  className,
  desk,
  to = '',
  ...rest
}: DeskLinkProps) {
  const charge = useCharge(desk);
  const { addSurfaceWithPane } = useSurfaceState();
  const onAppSelected = useCallback((app: ChargeWithDesk) => {
    addSurfaceWithPane({
      id: `${app.title}-${Date.now()}`,
      title: app.title,
      type: 'app',
      path: getAppHref(app.href)
    });
  }, []);

  return (
    <div
      className={className}
      {...rest}
      onClick={event => {
        onAppSelected(charge);
        if (rest.onClick) {
          rest.onClick(event);
        }
      }}
    >
      {children}
    </div>
  );
}
