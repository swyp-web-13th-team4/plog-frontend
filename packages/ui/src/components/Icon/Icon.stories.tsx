import type { Meta, StoryObj } from '@storybook/react';

import Icon from './Icon';
import { iconMap, type IconName } from './iconMap';

const allIconNames = Object.keys(iconMap) as IconName[];

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '아이콘을 디자인 시스템 레벨에서 관리하기 위한 컴포넌트입니다. `size`와 `boxed` 옵션을 통해 아이콘의 크기와 렌더링 방식을 제어할 수 있습니다.',
      },
    },
  },
  argTypes: {
    name: {
      description: '표시할 아이콘의 이름입니다.',
      control: 'select',
      options: allIconNames,
      table: {
        type: { summary: 'IconName' },
      },
    },
    size: {
      description: '아이콘 크기(`px`)를 설정합니다.',
      control: { type: 'number', min: 16, max: 96, step: 4 },
      table: {
        type: { summary: 'number' },
      },
    },
    boxed: {
      description: '`true`이면 정사각형 컨테이너로 감싸집니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    className: { table: { disable: true } },
  },
  args: {
    name: 'heart',
    boxed: true,
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const WITH_COLOR_CODE = `\
<Icon name="heart" className="text-primitive-red-400" />`;

const SIZES_CODE = `\
<Icon name="heart" size={16} />
<Icon name="heart" size={24} />
<Icon name="heart" size={32} />
<Icon name="heart" size={48} />`;

const NOT_BOXED_CODE = `\
<Icon name="heart" size={16} boxed={false} />
<Icon name="heart" size={24} boxed={false} />
<Icon name="heart" size={32} boxed={false} />
<Icon name="heart" size={48} boxed={false} />`;

export const Default: Story = {};

export const WithColor: Story = {
  parameters: {
    docs: {
      description: { story: '`className`으로 색상을 지정할 수 있습니다.' },
      source: { code: WITH_COLOR_CODE },
    },
  },
  render: () => <Icon name="heart" className="text-primitive-red-400" />,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '`size`에 따라 컨테이너와 아이콘이 함께 비례하여 커집니다.',
      },
      source: { code: SIZES_CODE },
    },
  },
  render: () => (
    <div className="flex items-end gap-6">
      {([16, 24, 32, 48] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="heart" size={size} />
          <span className="caption-md text-semantic-object-normal">
            {size}px
          </span>
        </div>
      ))}
    </div>
  ),
};

export const NotBoxed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`boxed={false}`이면 컨테이너 없이 아이콘만 렌더링합니다. `size`는 아이콘의 크기에 직접 적용됩니다.',
      },
      source: { code: NOT_BOXED_CODE },
    },
  },
  render: () => (
    <div className="flex items-end gap-6">
      {([16, 24, 32, 48] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="heart" size={size} boxed={false} />
          <span className="caption-md text-semantic-object-normal">
            {size}px
          </span>
        </div>
      ))}
    </div>
  ),
};

export const AllIcons: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: '모든 아이콘 목록입니다.' },
      source: { code: null },
    },
  },
  render: () => (
    <div className="grid grid-cols-7 gap-6">
      {allIconNames.map((name) => (
        <div key={name} className="flex flex-col items-center gap-4">
          <Icon name={name} />
          <span className="caption-md text-center text-semantic-object-normal">
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};
