import { type ComponentPropsWithoutRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import BlankIcon from '@/assets/blank.svg?react';

import { type TabGroupItem } from './Tab.types';
import TabGroup from './TabGroup';

const makeItems = (count: number): TabGroupItem[] =>
  Array.from({ length: count }, (_, index) => ({
    value: `tab-${index + 1}`,
    label: `탭 ${index + 1}`,
    icon: <BlankIcon />,
    panel: (
      <div className="body-md rounded-xl bg-semantic-bg-deep px-4 py-3 text-semantic-object-bold">
        탭 {index + 1} 내용
      </div>
    ),
  }));

const meta: Meta<typeof TabGroup> = {
  title: 'Components/TabGroup',
  component: TabGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`items` 배열로 탭 목록을 구성하는 컴포넌트입니다. 아이콘, 라벨, 패널 콘텐츠를 각 탭별로 전달할 수 있습니다.',
      },
    },
  },
  argTypes: {
    items: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    className: { table: { disable: true } },
    listClassName: { table: { disable: true } },
    itemClassName: { table: { disable: true } },
    panelClassName: { table: { disable: true } },
    keepMounted: {
      description:
        '비활성 패널을 DOM에 유지합니다. 각 item의 `keepMounted`로 개별 override할 수 있습니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    items: makeItems(4),
    keepMounted: false,
  },
};

export default meta;
type Story = StoryObj<typeof TabGroup>;

type ControlledTabGroupStoryProps = Omit<
  Partial<ComponentPropsWithoutRef<typeof TabGroup>>,
  'value' | 'defaultValue' | 'onValueChange'
> & {
  items: TabGroupItem[];
};

function ControlledTabGroupStory({
  items,
  keepMounted,
  ...restProps
}: ControlledTabGroupStoryProps) {
  const [value, setValue] = useState(items[0]?.value ?? '');

  return (
    <TabGroup
      items={items}
      value={value}
      onValueChange={setValue}
      keepMounted={keepMounted}
      panelClassName="pt-4"
      {...restProps}
    />
  );
}

export const Default: Story = {
  render: (args) => (
    <ControlledTabGroupStory
      items={args.items}
      keepMounted={args.keepMounted}
    />
  ),
};

export const WithoutIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: '아이콘 없이 라벨만 표시합니다.',
      },
    },
  },
  render: (args) => (
    <ControlledTabGroupStory
      items={args.items.map((item) => ({
        ...item,
        icon: undefined,
      }))}
      keepMounted={args.keepMounted}
    />
  ),
};

export const VariableItemCount: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '탭이 4개 이하면 부모 너비를 균등 분할하고, 5개부터는 4개 기준 너비를 유지한 채 가로 스크롤됩니다.',
      },
    },
  },
  render: () => (
    <div className="space-y-8">
      <ControlledTabGroupStory items={makeItems(2)} />
      <ControlledTabGroupStory items={makeItems(5)} />
    </div>
  ),
};

export const SelectiveKeepMounted: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '마운트 비용이 큰 패널은 `keepMounted: true`로 DOM에 유지할 수 있습니다.',
      },
    },
  },
  render: () => (
    <ControlledTabGroupStory
      items={[
        {
          value: 'map',
          label: '지도',
          icon: <BlankIcon />,
          keepMounted: true,
          panel: (
            <div className="body-md rounded-xl bg-semantic-bg-deep px-4 py-3 text-semantic-object-bold">
              탭을 전환해도 마운트 상태가 유지됩니다.
            </div>
          ),
        },
        {
          value: 'list',
          label: '목록',
          icon: <BlankIcon />,
          panel: (
            <div className="body-md rounded-xl bg-semantic-bg-deep px-4 py-3 text-semantic-object-bold">
              탭을 전환하면 언마운트됩니다.
            </div>
          ),
        },
      ]}
      keepMounted={false}
    />
  ),
};
