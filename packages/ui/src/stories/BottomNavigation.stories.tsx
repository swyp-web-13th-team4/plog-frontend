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
        component:
          '앱 최상위 메뉴 간 이동을 담당하는 하단 내비게이션 바입니다. `BottomNavigation.Item`으로 탭을 구성할 수 있습니다.',
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
        code: `const TABS = [
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
);`,
      },
    },
  },
  render: () => <DefaultStory />,
};
