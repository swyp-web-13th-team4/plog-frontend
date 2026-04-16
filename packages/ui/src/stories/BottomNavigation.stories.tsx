import { useState } from 'react';

import {
  Description,
  Primary,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import FeedIcon from '@/assets/feed.svg?react';
import LogIcon from '@/assets/log.svg?react';
import MapIcon from '@/assets/map.svg?react';
import MyIcon from '@/assets/my.svg?react';
import BottomNavigation from '@/components/BottomNavigation';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `앱 최상위 메뉴 간 이동을 담당하는 하단 내비게이션 바입니다. \`BottomNavigation.Item\`으로 탭을 구성할 수 있습니다.

페이지 이동이 목적인 경우 \`render\`로 \`<a>\` 또는 라우터 링크 컴포넌트를 전달하는 것이 좋습니다. \`<a>\`로 렌더링되어 스크린리더에서 링크로 인식되고, 새 탭에서 열기 등 기본 동작도 지원합니다.`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

function DefaultStory() {
  const TABS = [
    { id: 'map', icon: <MapIcon />, label: '지도' },
    { id: 'feed', icon: <FeedIcon />, label: '피드' },
    { id: 'log', icon: <LogIcon />, label: '기록' },
    { id: 'my', icon: <MyIcon />, label: 'MY' },
  ] as const;
  const [active, setActive] = useState<(typeof TABS)[number]['id']>('feed');

  return (
    <BottomNavigation>
      {TABS.map(({ id, icon, label }) => (
        <BottomNavigation.Item
          key={id}
          icon={icon}
          label={label}
          isActive={active === id}
          onClick={() => setActive(id)}
        />
      ))}
    </BottomNavigation>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `// Next.js 사용 시
const TABS = [
  { id: 'map', href: '/map', icon: <MapIcon />, label: '지도' },
  { id: 'feed', href: '/feed', icon: <FeedIcon />, label: '피드' },
  { id: 'log', href: '/log', icon: <LogIcon />, label: '기록' },
  { id: 'my', href: '/my', icon: <MyIcon />, label: 'MY' },
] as const;

<BottomNavigation>
  {TABS.map(({ id, href, icon, label }) => (
    <BottomNavigation.Item
      key={id}
      render={<Link href={href} />}
      icon={icon}
      label={label}
      isActive={pathname === href}
    />
  ))}
</BottomNavigation>`,
      },
    },
  },
  render: () => <DefaultStory />,
};
