'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BottomNavigation } from '@plog/ui';

import FeedIcon from '@/shared/assets/icons/feed.svg';
import LogIcon from '@/shared/assets/icons/log.svg';
import MapIcon from '@/shared/assets/icons/map.svg';
import MyIcon from '@/shared/assets/icons/my.svg';

const TABS = [
  { id: 'map', href: '/map', icon: <MapIcon />, label: '지도' },
  { id: 'feed', href: '/feed', icon: <FeedIcon />, label: '피드' },
  { id: 'log', href: '/log', icon: <LogIcon />, label: '기록' },
  { id: 'my', href: '/my', icon: <MyIcon />, label: 'MY' },
] as const;

export default function BottomTab() {
  const pathname = usePathname();

  return (
    <footer className="fixed right-0 bottom-0 left-0 z-30 mx-auto w-full max-w-layout">
      <BottomNavigation>
        {TABS.map(({ id, href, icon, label }) => (
          <BottomNavigation.Item
            key={id}
            render={<Link href={href} />}
            nativeButton={false}
            role="link"
            icon={icon}
            label={label}
            active={pathname === href || pathname.startsWith(`${href}/`)}
          />
        ))}
      </BottomNavigation>
    </footer>
  );
}
