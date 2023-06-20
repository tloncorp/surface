import cn from 'classnames';
import React, { useCallback } from 'react';
import { useGroups } from './groups';
import Notification from './Notification';
import { useNotifications } from './useNotifications';
import { useSawSeamMutation } from '@/state/hark';
import { Spinner } from '@/components/Spinner';
import { useIsMobile } from '@/logic/useMedia';
import { randomIntInRange } from '@/logic/utils';

interface MarkAsReadProps {
  unreads: boolean;
}

function MarkAsRead({ unreads }: MarkAsReadProps) {
  const isMobile = useIsMobile();
  const { mutate: sawSeam, isLoading } = useSawSeamMutation();
  const markAllRead = useCallback(() => {
    sawSeam({ seam: { all: null } });
  }, []);

  return (
    <button
      disabled={isLoading || !unreads}
      className={cn(
        'whitespace-nowrap text-sm',
        isMobile ? 'small-button' : 'button',
        {
          'bg-gray-400 text-gray-800': isLoading || !unreads,
          'bg-blue text-white': !isLoading && unreads
        }
      )}
      onClick={markAllRead}
    >
      {isLoading ? <Spinner className="h-4 w-4" /> : 'Mark All Read'}
    </button>
  );
}

function NotificationPlaceholder() {
  const isMobile = useIsMobile();
  return (
    <div className="flex w-full animate-pulse flex-col rounded-lg">
      <div className="flex w-full flex-1 space-x-3 rounded-lg p-2">
        <div className="flex h-6 w-24 justify-center rounded-md bg-gray-100 text-sm" />
      </div>
      <div className="flex w-full flex-1 space-x-3 rounded-lg p-2">
        <div
          className="h-12 w-full rounded-md bg-gray-200"
          style={{
            width: `${randomIntInRange(300, isMobile ? 300 : 900)}px`
          }}
        />
      </div>
    </div>
  );
}

export const Notifications = () => {
  const { notifications, count, loaded } = useNotifications();
  const groups = useGroups();

  return (
    <div className="bg-white h-full overflow-hidden rounded-3xl border-2 border-gray-50 ">
      <section className="w-full h-full overflow-y-scroll">
      <h2 className="p-4 text-md pt-5 font-bold text-black">
        Recent Notifications
      </h2>
        {loaded ? (
          notifications.length === 0 ? (
            <div className="mt-3 flex w-full items-center justify-center">
              <span className="text-base font-semibold text-gray-400">
                No notifications
              </span>
            </div>
          ) : (
            notifications.map(grouping => (
              <div
                className="mb-2 rounded-xl px-4 py-0"
                key={grouping.date}
              >
                <ul className="space-y-2">
                  {grouping.skeins.map(b => (
                    <li key={b.time}>
                      <Notification bin={b} groups={groups} />
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )
        ) : (
          new Array(15)
            .fill(true)
            .map((_, i) => <NotificationPlaceholder key={i} />)
        )}
      </section>
    </div>
  );
};
