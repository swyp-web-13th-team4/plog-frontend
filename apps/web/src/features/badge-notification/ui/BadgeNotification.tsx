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
    const es = new EventSource(`${CLIENT_BASE_URL}/notification/subscribe`);

    es.addEventListener('badge_grant', (e) => {
      const payload: BadgeGrantPayload = JSON.parse(e.data);
      setAcquiredBadge(payload);
    });

    es.onerror = () => es.close();

    return () => es.close();
  }, []);

  return (
    <BadgeAcquiredDialog
      open={acquiredBadge !== null}
      badge={acquiredBadge}
      onClose={() => setAcquiredBadge(null)}
    />
  );
}
