import Image from 'next/image';

import { type UserBadge } from '../model/types';

type Props = {
  badge: UserBadge;
  size?: number;
};

export default function UserProfileMainBadge({ badge, size = 24 }: Props) {
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
