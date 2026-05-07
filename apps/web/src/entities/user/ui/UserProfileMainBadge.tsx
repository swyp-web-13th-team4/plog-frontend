import Image from 'next/image';

import { BadgeDto } from '@/shared/api/dto/badge';

type UserMainBadgeType = {
  badge: BadgeDto;
  size?: number;
};
export default function UserProfileMainBadge({
  badge,
  size = 24,
}: UserMainBadgeType) {
  return (
    <Image
      src={badge.imageUrl}
      width={size}
      height={size}
      alt={badge.name}
      aria-label={`${badge.name}. ${badge.description}`}
      title={badge.description}
      className="shrink-0"
    />
  );
}
