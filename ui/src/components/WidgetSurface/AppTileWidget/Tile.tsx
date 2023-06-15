import classNames from 'classnames';
import React, { FunctionComponent, useCallback } from 'react';
// import * as Tooltip from '@radix-ui/react-tooltip';
import { chadIsRunning } from '@/gear';
// import { TileMenu } from '@/components/WidgetSurface/AppTileWidget/TileMenu';
import { Spinner } from '@/components/Spinner';
import { getAppHref } from '@/logic/utils';
// import { useRecentsStore } from '@/state/recents';
import { ChargeWithDesk } from '@/state/docket';
import { useTileColor } from '@/tiles/useTileColor';
import { usePike } from '@/state/kiln';
import Bullet from '@/components/icons/BulletIcon';
import { useHasInviteToGroup } from '@/state/hark';
// import { useGroups } from '@/state/groups';
import { useSurfaceState } from '@/state/surface';

type TileProps = {
  charge: ChargeWithDesk;
  desk: string;
  disabled?: boolean;
};

export const Tile: FunctionComponent<TileProps> = ({
  charge,
  desk,
  disabled = false
}) => {
  const { addSurfaceWithPane } = useSurfaceState();
  const onAppSelected = useCallback((app: ChargeWithDesk) => {
    addSurfaceWithPane({
      id: `${app.title}-${Date.now()}`,
      title: app.title,
      type: 'app',
      path: getAppHref(app.href)
    });
  }, []);
  // const groups = useGroups();
  // const hasGroups = groups && Object.entries(groups).length > 0;
  const invite = useHasInviteToGroup();
  const inviteGroupName =
    invite &&
    typeof invite.top.con[2] === 'object' &&
    'emph' in invite.top.con[2]
      ? invite.top.con[2].emph
      : 'a group';
  // const addRecentApp = useRecentsStore(state => state.addRecentApp);
  const { title, image, color, chad, href } = charge;
  const pike = usePike(desk);
  const { lightText, tileColor, menuColor, suspendColor, suspendMenuColor } =
    useTileColor(color);
  const loading = !disabled && 'install' in chad;
  const suspended = disabled || 'suspend' in chad;
  const hung = 'hung' in chad;
  // TODO should held zest be considered inactive? suspended? also, null sync?
  const active = !disabled && chadIsRunning(chad);
  // const link = getAppHref(href);
  const backgroundColor = suspended
    ? suspendColor
    : active
    ? tileColor || 'purple'
    : suspendColor;

  return (
    <div
      // href={active ? link : undefined}
      // target="_blank"
      // rel="noreferrer"
      className={classNames(
        'default-ring group absolute h-full w-full overflow-hidden rounded-3xl font-semibold focus-visible:ring-4',
        suspended && 'opacity-50 grayscale',
        lightText && active && !loading ? 'text-gray-200' : 'text-gray-800',
        !active && 'cursor-default'
      )}
      style={{ backgroundColor }}
      onClick={() => onAppSelected(charge)}
      // onAuxClick={() => addRecentApp(desk)}
    >
      <div>
        {/* desk === 'groups' && !hasGroups && (
          <Tooltip.Root>
            <Tooltip.Trigger className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
              <div className="absolute h-[42px] w-[42px] animate-pulse rounded-full bg-indigo opacity-10 sm:right-0 sm:top-0" />
              <Bullet className="h-[42px] w-[42px] text-indigo" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="right"
                sideOffset={16}
                className="z-40 w-[216px] rounded-lg bg-indigo p-4"
              >
                <p className="text-white">
                  {invite ? (
                    <>You have an invitation to join {inviteGroupName}.</>
                  ) : (
                    <>
                      Open Groups to create, join, and accept invitations to
                      communities.
                    </>
                  )}
                </p>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        ) */}
        <div className="absolute left-4 top-4 z-10 flex items-center sm:left-6 sm:top-6">
          {pike?.zest === 'held' && !disabled && (
            <Bullet className="h-4 w-4 text-orange-500 dark:text-black" />
          )}
          {!active && (
            <>
              {loading && <Spinner className="mr-2 h-6 w-6" />}
              <span className="text-gray-500">
                {suspended
                  ? 'Suspended'
                  : loading
                  ? 'Installing'
                  : hung
                  ? 'Errored'
                  : null}
              </span>
            </>
          )}
        </div>
        {/*
        <TileMenu
          desk={desk}
          chad={chad}
          menuColor={active ? menuColor : suspendMenuColor}
          lightText={lightText}
          className="pointer-coarse:opacity-100 hover-none:opacity-100 absolute right-3 top-3 z-10 opacity-0 focus:opacity-100 group-hover:opacity-100 sm:right-5 sm:top-5"
        />
        */}
        {title && (
          <div
            className="h4 absolute bottom-[8%] left-[5%] z-10 rounded-lg px-3 py-1 sm:bottom-7 sm:left-5"
            style={{ backgroundColor }}
          >
            <h3 className="mix-blend-hard-light">{title}</h3>
          </div>
        )}
        {image && !loading && (
          <img
            className="absolute left-0 top-0 h-full w-full object-cover"
            src={image}
            alt=""
          />
        )}
      </div>
    </div>
  );
};
