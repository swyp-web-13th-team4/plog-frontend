import type { UserBadge } from '@/entities/user';

export type BadgeGrantPayload = Omit<UserBadge, 'isAcquired'>;
