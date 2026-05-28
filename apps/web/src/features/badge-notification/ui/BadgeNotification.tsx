'use client';

import { useEffect, useState } from 'react';

import { CLIENT_BASE_URL } from '@/shared/api/constants';

import { type BadgeGrantPayload } from '../model/types';
import BadgeAcquiredDialog from './BadgeAcquiredDialog';

export default function BadgeNotification() {
  const [acquiredBadge, setAcquiredBadge] = useState<BadgeGrantPayload | null>(
    null,
  );

  useEffect(() => {
    let es: EventSource | null = null;
    let retryCount = 0;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;

    const MAX_RETRIES = 10;
    const RETRY_DELAY_MS = 3000;

    const connect = () => {
      es = new EventSource(`${CLIENT_BASE_URL}/notification/subscribe`);

      es.addEventListener('badge_grant', (e) => {
        const payload: BadgeGrantPayload = JSON.parse(e.data);
        setAcquiredBadge(payload);
      });

      es.onopen = () => {
        retryCount = 0;
      };

      es.onerror = () => {
        es?.close();
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          retryTimeout = setTimeout(connect, RETRY_DELAY_MS);
        }
      };
    };

    const handleOnline = () => {
      if (retryTimeout) clearTimeout(retryTimeout);
      es?.close();
      retryCount = 0;
      connect();
    };

    window.addEventListener('online', handleOnline);
    connect();

    return () => {
      es?.close();
      if (retryTimeout) clearTimeout(retryTimeout);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <BadgeAcquiredDialog
      open={acquiredBadge !== null}
      badge={acquiredBadge}
      onClose={() => setAcquiredBadge(null)}
    />
  );
}
